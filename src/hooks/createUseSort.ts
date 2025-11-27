import { useMemo } from 'react';
import { Sorter, CustomSortDefs } from '../types';

const createUseSort = function <D>(sortDef?: CustomSortDefs<D>) {
  const useSort = (items: D[], sorter?: Sorter<D>) => {
    const sortedItems = useMemo(() => {
      let sorted = [...items];
      if (!sorter) return sorted;

      const sortBy = sorter?.fieldKey;

      return sorted.sort((a, b) => {
        const aVal = a[sortBy];
        const bVal = b[sortBy];

        switch (sortDef?.[sortBy]) {
          case 'num': {
            const aNum = Number(aVal);
            const bNum = Number(bVal);
            return sorter.order === 'asc' ? aNum - bNum : bNum - aNum;
          }
          case 'alpha': {
            const aStr = String(aVal);
            const bStr = String(bVal);
            return sorter.order === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
          }
        }
        return 0;
      });
    }, [items, sorter]);

    return {
      sortedItems,
    };
  };

  return useSort;
};

export default createUseSort;
