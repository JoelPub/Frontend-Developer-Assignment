import createUseSort from '../hooks/createUseSort';
import { ApiItem, CustomSortDefs } from '../types';

const customSortDefs: CustomSortDefs<ApiItem> = {
  price: 'num',
  title: 'alpha',
};
const useContentSort = createUseSort<ApiItem>(customSortDefs);

export default useContentSort;
