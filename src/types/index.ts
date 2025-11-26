export enum PricingOption {
  PAID = 'PAID',
  FREE = 'FREE',
  VIEW_ONLY = 'VIEW_ONLY',
}

export interface ContentItem {
  id: string;
  photo: string;
  userName: string;
  title: string;
  pricingOption: PricingOption;
  price?: number;
}

export interface FilterState {
  pricingOptions: PricingOption[];
  keyword: string;
  sortBy: SortOption;
  priceRange: [number, number];
}
export enum SortOption {
  ITEM_NAME = 'ITEM_NAME',
  PRICE_HIGH = 'PRICE_HIGH',
  PRICE_LOW = 'PRICE_LOW',
}
