import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSortBy } from '../features/filters/filterSlice';
import { SortOption } from "../types";

const SortDropdown = () => {
    const dispatch = useAppDispatch();
    const sortBy = useAppSelector((state) => state.filters.sortBy);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSortBy(e.target.value as SortOption));
    };

    return (
        <div className="sort-section">
            <h3>Sort By</h3>
            <select
                className="sort-dropdown"
                value={sortBy}
                onChange={handleChange}
                data-testid="sort-dropdown"
            >
                <option value={SortOption.ITEM_NAME}>Item Name</option>
                <option value={SortOption.PRICE_HIGH}>Higher Price</option>
                <option value={SortOption.PRICE_LOW}>Lower Price</option>
            </select>
        </div>
    );
};

export default SortDropdown;