import { KeywordFilterCondition, KeywordFilterHandler } from '../../types';

export const createKeywordFilter = <D>(fieldKeys: (keyof D)[]): KeywordFilterHandler<D> => {
  return (item: D, condition?: KeywordFilterCondition): boolean => {
    if (!condition || condition === '') return true;

    const keyword = condition.toLowerCase();
    return fieldKeys.some((key) => {
      const value = item[key];
      return String(value).toLowerCase().includes(keyword);
    });
  };
};
