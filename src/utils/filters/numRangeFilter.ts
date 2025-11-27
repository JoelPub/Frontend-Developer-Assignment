import { NumRangeFilterCondition, NumRangeFilterHandler } from '../../types';

export const createNumRangeFilter = <D>(
  fieldKey: keyof D,
  passByCondition?: (item: D) => boolean
): NumRangeFilterHandler<D> => {
  return (item: D, condition?: NumRangeFilterCondition): boolean => {
    if (!condition) return true;

    if (passByCondition?.(item)) return true;

    const value = item[fieldKey] as unknown as number;
    const [min, max] = condition;
    return value >= min && value <= max;
  };
};
