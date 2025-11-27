import { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSortBy, setSorter } from '../features/filters/filtersSlice';
import { SortOption } from '../types';

const sortOptions = [
  { value: SortOption.ITEM_NAME, label: 'Relevance' },
  { value: SortOption.PRICE_HIGH, label: 'Higher Price' },
  { value: SortOption.PRICE_LOW, label: 'Lower Price' },
];

const SortDropdown = () => {
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector((state) => state.filters.sortBy);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: SortOption) => {
    dispatch(setSortBy(option));

    switch (option) {
      case SortOption.ITEM_NAME:
        dispatch(setSorter({ fieldKey: 'title', order: 'asc' }));
        break;
      case SortOption.PRICE_HIGH:
        dispatch(setSorter({ fieldKey: 'price', order: 'desc' }));
        break;
      case SortOption.PRICE_LOW:
        dispatch(setSorter({ fieldKey: 'price', order: 'asc' }));
        break;
    }

    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as globalThis.Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const currentLabel = sortOptions.find((opt) => opt.value === sortBy)?.label || 'Relevance';

  return (
    <div className="sort-section">
      <div className="sort-controls" ref={dropdownRef}>
        <label className="sort-label">Sort by</label>
        <div className="custom-dropdown" data-testid="sort-dropdown">
          <button
            className="dropdown-trigger"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
          >
            <span>{currentLabel}</span>
            <svg
              width="8"
              height="5"
              viewBox="0 0 8 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`dropdown-arrow ${isOpen ? 'open' : ''}`}
            >
              <path d="M4 5L0 0h8z" fill="#999" />
            </svg>
          </button>
          {isOpen && (
            <div className="dropdown-menu" role="listbox">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  className={`dropdown-item ${sortBy === option.value ? 'selected' : ''}`}
                  onClick={() => handleSelect(option.value)}
                  role="option"
                  aria-selected={sortBy === option.value}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SortDropdown;
