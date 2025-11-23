import { SortOption } from "../types";

const SortDropdown = () => {
    return (
        <div className="sort-section">
            <h3>Sort By</h3>
            <select
                className="sort-dropdown"
            >
                <option value={SortOption.ITEM_NAME}>Item Name</option>
                <option value={SortOption.PRICE_HIGH}>Higher Price</option>
                <option value={SortOption.PRICE_LOW}>Lower Price</option>
            </select>
        </div>
    );
};

export default SortDropdown;