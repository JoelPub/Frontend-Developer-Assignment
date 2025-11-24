import { useAppDispatch, useAppSelector } from './store/hooks';
import { resetFilters } from './features/filters/filterSlice';
import SearchBar from './components/SearchBar';
import PricingFilters from './components/PricingFilters';
import SortDropdown from './components/SortDropdown';
import PriceSlider from './components/PriceSlider';
import ContentList from './components/ContentList';
import './styles/global.css'

const App = () => {
  const dispatch = useAppDispatch();

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
