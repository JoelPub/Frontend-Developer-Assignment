import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setKeyword } from '../features/filters/filtersSlice';

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const appliedKeyword = useAppSelector((state) => state.filters.keyword);
  const [inputValue, setInputValue] = useState(appliedKeyword);

  //sync local state when Redux state changes (e.g., on reset)
  useEffect(() => {
    setInputValue(appliedKeyword);
  }, [appliedKeyword]);

  const hasChanges = inputValue !== appliedKeyword;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    dispatch(setKeyword(inputValue));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Find the items you're looking for"
          value={inputValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          data-testid="search-input"
        />
        <svg
          className={`search-icon ${hasChanges ? 'active' : ''}`}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleSearch}
          style={{ cursor: 'pointer', pointerEvents: 'auto' }}
          data-testid="search-icon"
        >
          <path
            d="M9 17AB 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;
