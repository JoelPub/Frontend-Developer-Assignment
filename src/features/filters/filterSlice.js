import { createSlice } from '@reduxjs/toolkit';
import { SortOption } from '../../types';

const initialState = {
    pricingOptions: [],
    keywrod: '',
    sortBy: SortOption.ITEM_NAME,
    priceRange: [0, 999 ],
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    togglePricingoption: (state, action) => {
        const index = state.pricingOptions.indexOf(action.payload);
        if (index > -1) {
            state.pricingOptions.splice(index, 1);
        } else {
            state.pricingOptions.push(action.payload); 
        }
    },
    setkeyword: (state, action) => {
        state.keyword = action.payload;
    },
    setSortBy: (state, action) => {
        state.sortBy = action.payload;
    },
    setPriceRange: (state, action) => {
        state.priceRange = action.payload;
    },
    resetFilters: () => initialState,
    setFiltersFromUrl: (state, action) => {
        return { ...state, ...action.payload };
    }
  },
});

export const {
    togglePricingoption,
    setkeyword,
    setSortBy,
    setPriceRange,
    resetFilters,
    setFiltersFromUrl,
} = filterSlice.actions;

export default filterSlice.reducer;