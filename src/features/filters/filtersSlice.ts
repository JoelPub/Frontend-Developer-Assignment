import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ApiItem, Sorter, FilterSortState } from '../../types';
import { PricingOption, SortOption } from '../../types';

const initialState: FilterSortState = {
  pricingOptions: [],
  keyword: '',
  priceRange: [0, 999],

  sortBy: SortOption.ITEM_NAME,

  // ------- * --- new --- * --------
  filters: {},
  sorter: {
    fieldKey: 'title',
    order: 'asc',
  },
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
      // Sync with filters object for ContentList filtering
      state.filters.pricingOptions = state.pricingOptions;
    },
    setKeyword: (state, action: PayloadAction<string | undefined>) => {
      state.keyword = action.payload;
      state.filters.keyword = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
      state.filters.priceRange = action.payload;
    },
    setPricingOptions: (state, action: PayloadAction<PricingOption[]>) => {
      state.filters.pricingOptions = action.payload;
    },
    setSorter: (state, action: PayloadAction<Sorter<ApiItem>>) => {
      state.sorter = action.payload;
    },
    resetFilters: () => initialState,
    setFiltersFromUrl: (state, action: PayloadAction<Partial<FilterSortState>>) => {
      const newState = { ...state, ...action.payload };
      // Sync with filters object for ContentList filtering
      newState.filters = {
        pricingOptions: newState.pricingOptions,
        keyword: newState.keyword,
        priceRange: newState.priceRange,
      };
      // Sync sortBy with sorter object
      if (newState.sortBy) {
        switch (newState.sortBy) {
          case SortOption.ITEM_NAME:
            newState.sorter = { fieldKey: 'title', order: 'asc' };
            break;
          case SortOption.PRICE_HIGH:
            newState.sorter = { fieldKey: 'price', order: 'desc' };
            break;
          case SortOption.PRICE_LOW:
            newState.sorter = { fieldKey: 'price', order: 'asc' };
            break;
        }
      }
      return newState;
    },
  },
});

export const {
  togglePricingOption,

  setKeyword,
  setPriceRange,
  setPricingOptions,

  setSortBy,
  setSorter,

  resetFilters,
  setFiltersFromUrl,
} = filtersSlice.actions;

export default filtersSlice.reducer;
