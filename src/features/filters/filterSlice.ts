import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PricingOption, SortOption } from '../../types';

interface FilterState {
    pricingOptions: PricingOption[];
    keyword: string;
    sortBy: SortOption;
    priceRange: [number, number];
}
const initialState: FilterState = {
    pricingOptions: [],
    keyword: '',
    sortBy: SortOption.ITEM_NAME,
    priceRange: [0, 999 ],
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    togglePricingoption: (state, action: PayloadAction<PricingOption>) => {
        const index = state.pricingOptions.indexOf(action.payload);
        if (index > -1) {
            state.pricingOptions.splice(index, 1);
        } else {
            state.pricingOptions.push(action.payload); 
        }
    },
    setkeyword: (state, action: PayloadAction<string>) => {
        state.keyword = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
        state.sortBy = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
        state.priceRange = action.payload;
    },
    resetFilters: () => initialState,
    setFiltersFromUrl: (state, action: PayloadAction<Partial<FilterState>>) => {
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