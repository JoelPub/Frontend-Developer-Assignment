import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { loadContentItems } from './features/content/contentSlice';
import { resetFilters, setFiltersFromUrl } from './features/filters/filterSlice';
import { serializeStateToUrl, deserialzeStateFromUrl } from './utils/urlState';
import SearchBar from './components/SearchBar';
import PricingFilters from './components/PricingFilters';
import SortDropdown from './components/SortDropdown';
import PriceSlider from './components/PriceSlider';
import ContentList from './components/ContentList';
import './styles/global.css'

const App = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);

  // Load content items on mount
  useEffect(() => {
    dispatch(loadContentItems());
  }, [dispatch]);

  // Initialize filters from URL on mount
  useEffect(() => {
    const urlState = deserialzeStateFromUrl(window.location.search);
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
    })

    const newUrl = urlString ? `?${urlString}` : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }, [filters]);

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="app">
        <header className='app-header'>
            <h1>Content Filter App</h1>
        </header>

        <div className="filters-section">
            <SearchBar />
            <PricingFilters />
            <SortDropdown />
            <PriceSlider />
            <div className="filter-actions">
                <button className="reset-button" onClick={handleReset} data-testid="reset-button">
                  Reset Filters
                </button>
            </div>
        </div>
            
        <ContentList />
    </div>
  );
};

export default App;
