import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { ContentState } from '../../types';
import { fetchApiItems } from '../../services/api';

const initialState: ContentState = {
  items: [],
  loading: false,
  error: null,
};

export const loadApiItems = createAsyncThunk('content/loadApiItems', async () => {
  const items = await fetchApiItems();
  return items;
});

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadApiItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadApiItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadApiItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load content';
      });
  },
});

export default contentSlice.reducer;
