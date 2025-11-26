import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { loadContentItems } from './features/content/contentSlice';
import { resetFilters, setFiltersFromUrl } from './features/filters/filtersSlice';
import { serializeStateToUrl, deserializeStateFromUrl } from './utils/urlState';
import SearchBar from './components/SearchBar';
import PricingFilters from './components/PricingFilters';
import SortDropdown from './components/SortDropdown';
import PriceSlider from './components/PriceSlider';
import ContentList from './components/ContentList';
import './styles/global.css';

const App = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);

  // Load content items on mount
  useEffect(() => {
    dispatch(loadContentItems());
  }, [dispatch]);

  // Initialize filters from URL on mount
  useEffect(() => {
    const urlState = deserializeStateFromUrl(window.location.search);
    if (Object.keys(urlState).length > 0) {
      dispatch(setFiltersFromUrl(urlState));
    }
  }, [dispatch]);

  // Update URL when filters change
  useEffect(() => {
    const urlString = serializeStateToUrl({
      pricingOptions: filters.pricingOptions,
      keyword: filters.keyword,
      sortBy: filters.sortBy,
      priceRange: filters.priceRange,
    });

    const newUrl = urlString ? `?${urlString}` : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }, [filters]);

  const hasFiltersChanged = () => {
    return (
      filters.pricingOptions.length > 0 ||
      filters.keyword !== '' ||
      filters.priceRange[0] !== 0 ||
      filters.priceRange[1] !== 999
    );
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Content Filter App</h1>
      </header>

      <div className="filters-section">
        <SearchBar />
        <div className="filters-row">
          <PricingFilters />
          <PriceSlider />
          <button
            className={`reset-button ${hasFiltersChanged() ? 'active' : ''}`}
            onClick={handleReset}
            data-testid="reset-button"
            disabled={!hasFiltersChanged()}
          >
            RESET
          </button>
        </div>
      </div>

      <SortDropdown />

      <ContentList />
    </div>
  );
};

export default App;
