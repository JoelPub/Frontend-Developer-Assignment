import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSortBy } from '../features/filters/filtersSlice';
import { SortOption } from '../types';

const SortDropdown = () => {
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector((state) => state.filters.sortBy);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortBy(e.target.value as SortOption));
  };

  return (
    <div className="sort-section">
      <div className="sort-controls">
        <label className="sort-label">Sort by</label>
        <select
          className="sort-dropdown"
          value={sortBy}
          onChange={handleChange}
          data-testid="sort-dropdown"
        >
          <option value={SortOption.ITEM_NAME}>Relevance</option>
          <option value={SortOption.PRICE_HIGH}>Higher Price</option>
          <option value={SortOption.PRICE_LOW}>Lower Price</option>
        </select>
      </div>
    </div>
  );
};

export default SortDropdown;
