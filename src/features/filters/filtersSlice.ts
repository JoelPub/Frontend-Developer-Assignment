import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PricingOption, SortOption } from '../../types';

interface FiltersState {
  pricingOptions: PricingOption[];
  keyword: string;
  sortBy: SortOption;
  priceRange: [number, number];
}
const initialState: FiltersState = {
  pricingOptions: [],
  keyword: '',
  sortBy: SortOption.ITEM_NAME,
  priceRange: [0, 999],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    togglePricingOption: (state, action: PayloadAction<PricingOption>) => {
      const index = state.pricingOptions.indexOf(action.payload);
      if (index > -1) {
        state.pricingOptions.splice(index, 1);
      } else {
        state.pricingOptions.push(action.payload);
      }
    },
    setKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    resetFilters: () => initialState,
    setFiltersFromUrl: (state, action: PayloadAction<Partial<FiltersState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  togglePricingOption,
  setKeyword,
  setSortBy,
  setPriceRange,
  resetFilters,
  setFiltersFromUrl,
} = filtersSlice.actions;

export default filtersSlice.reducer;
