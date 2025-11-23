import SearchBar from './components/SearchBar';
import PricingFilters from './components/PricingFilters';
import SortDropdown from './components/SortDropdown';
import PriceSlider from './components/PriceSlider';
import './styles/global.css'

const App = () => {
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
                <button className="reset-button">Reset Filters</button>
            </div>
        </div>
    </div>
  );
};

export default App;
