import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setkeyword } from '../features/filters/filterSlice';

const SearchBar = () => {
    const dispatch = useAppDispatch();
    const keyword = useAppSelector((state) => state.filters.keyword);

    const handleChange = (e) => {
        dispatch(setkeyword(e.target.value));
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                className="search-input"
                placeholder="Search by user name or title..."
                value={keyword}
                onChange={handleChange}
                data-testid="search-input"
            />
        </div>
    );
};

export default SearchBar;