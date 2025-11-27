import { MultiOptionFilterCondition, MultiOptionFilterHandler } from '../../types';

export const createMultiOptionsFilter = <D, E = string>(
  fieldKey: keyof D
): MultiOptionFilterHandler<D, E> => {
  return (item: D, condition?: MultiOptionFilterCondition<E>): boolean => {
    if (!condition || condition.length === 0) return true;

    const value = item[fieldKey] as unknown as E;
    return condition.includes(value);
  };
};
