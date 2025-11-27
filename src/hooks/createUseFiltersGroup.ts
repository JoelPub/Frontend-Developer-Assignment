import { useMemo } from 'react';
import { BaseFilterHandler } from '../types';

const createUseFiltersGroup = function <D>(
  operator: 'and' | 'or',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterHandlers: Record<string, BaseFilterHandler<D, any>>
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const useFiltersGroup = (items: D[], conditions?: Record<string, any>) => {
    const filteredItems = useMemo(() => {
      if (!conditions) return items;

      const filtered = items.filter((item) => {
        let result = true;

        Object.keys(filterHandlers).map((filterKey) => {
          const handler = filterHandlers[filterKey];
          const condition = conditions[filterKey];
          const flag = handler(item, condition);

          switch (operator) {
            case 'and':
              result = result && flag;
              break;
            case 'or':
              result = result || flag;
              break;
          }
        });

        return result;
      });

      return filtered;
    }, [items, conditions]);

    return filteredItems;
  };

  return useFiltersGroup;
};

export default createUseFiltersGroup;
