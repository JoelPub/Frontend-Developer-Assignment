const SearchBar = () => {
    return (
        <div className="search-bar">
            <input
                type="text"
                className="search-input"
                placeholder="Search by user name or title..."
            />
        </div>
    );
};

export default SearchBar;