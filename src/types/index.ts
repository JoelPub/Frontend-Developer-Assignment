// ===== Enums =====
export enum PricingOption {
  PAID = 0,
  FREE = 1,
  VIEW_ONLY = 2,
}

export enum SortOption {
  ITEM_NAME = 'ITEM_NAME',
  PRICE_HIGH = 'PRICE_HIGH',
  PRICE_LOW = 'PRICE_LOW',
}

export enum FilterType {
  AND = 'and',
  OR = 'or',
}

// ===== Base Types =====
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PartialRecord<K extends keyof any, V> = {
  [P in K]?: V;
};

// ===== API Data Types =====
// ApiItem matches the actual API response structure
// API returns: {"id":"content-001","creator":"Adam","title":"Yellow green coat","pricingOption":0,"imagePath":"https://...","price":50}
export interface ApiItem {
  id: string;
  creator: string;
  title: string;
  pricingOption: number | PricingOption;
  imagePath: string;
  price?: number;
}

// ===== Filter Types =====
export interface FilterState {
  pricingOptions: PricingOption[];
  keyword: string;
  priceRange: [number, number];
  sortBy: SortOption;
}

export type KeywordFilterCondition = string;
export type MultiOptionFilterCondition<E = string> = E[];
export type NumRangeFilterCondition = [number, number];

export type CustomFiltersConditionsMap = {
  keyword?: KeywordFilterCondition;
  pricingOptions?: MultiOptionFilterCondition<PricingOption>;
  priceRange?: NumRangeFilterCondition;
};

// ===== Filter Handler Types =====
export type BaseFilterHandler<D, C> = (item: D, condition?: C) => boolean;

export type KeywordFilterHandler<D> = BaseFilterHandler<D, KeywordFilterCondition>;
export type MultiOptionFilterHandler<D, E = string> = BaseFilterHandler<
  D,
  MultiOptionFilterCondition<E>
>;
export type NumRangeFilterHandler<D> = BaseFilterHandler<D, NumRangeFilterCondition>;

// ===== Sort Types =====
export type Sorter<D> = {
  fieldKey: keyof D;
  order: 'asc' | 'desc';
};

export type CustomSortDefs<D> = PartialRecord<keyof D, 'num' | 'alpha'>;

// ===== Hook Types =====
export type UseFilterItem<D, C> = (items: D[], condition?: C) => { filteredItems: D[] };

// ===== Component Props Types =====
export interface ContentCardProps {
  item: ApiItem;
}

// ===== Redux State Types =====
export interface ContentState {
  items: ApiItem[];
  loading: boolean;
  error: string | null;
}

export interface FilterSortState {
  pricingOptions: PricingOption[];
  keyword?: string;
  priceRange: [number, number];
  sortBy: SortOption;
  filters: CustomFiltersConditionsMap;
  sorter?: Sorter<ApiItem>;
}

// ===== Utility Types =====
export interface UrlState {
  pricingOptions?: PricingOption[];
  keyword?: string;
  sortBy?: SortOption;
  priceRange?: [number, number];
}
