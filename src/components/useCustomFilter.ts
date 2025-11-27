import {
  createKeywordFilter,
  createMultiOptionsFilter,
  createNumRangeFilter,
} from '../utils/filters';

import { ApiItem, PricingOption } from '../types';
import createUseFiltersGroup from '../hooks/createUseFiltersGroup';

const passByPriceOption = (item: ApiItem) => {
  return item.pricingOption !== PricingOption.PAID || item.price === undefined;
};

const customFilterHandlers = {
  keyword: createKeywordFilter<ApiItem>(['creator', 'title']),
  pricingOptions: createMultiOptionsFilter<ApiItem, number>('pricingOption'),
  priceRange: createNumRangeFilter<ApiItem>('price', passByPriceOption),
};

const useCustomFilterGroup = createUseFiltersGroup('and', customFilterHandlers);

export default useCustomFilterGroup;
