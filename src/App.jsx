import './styles/global.css'

const App = () => {
  return (
    <div className="app">
        <header className='app-header'>
            <h1>Content Filter App</h1>
        </header>

        <div className="filters-section">
            <div className="filter-actions">
                <button className="reset-button">Reset Filters</button>
            </div>
        </div>
    </div>
  );
};

export default App;
