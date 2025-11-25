import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ContentItem } from '../../types';
import { fetchContentItems } from '../../services/api';

interface ContentState {
    items: ContentItem[];
    loading: boolean;
    error: string | null;
}
const initialState: ContentState = {
    items: [],
    loading: false,
    error: null,
};

export const loadContentItems = createAsyncThunk('content/loadContentItems', async () => {
    const items = await fetchContentItems();
    return items;
});

const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loadContentItems.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loadContentItems.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(loadContentItems.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to load content';
        });
        
    },
});

export default contentSlice.reducer;