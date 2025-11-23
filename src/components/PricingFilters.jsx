const PricingFilters = () => {
    return (
        <div className="pricing-filters">
            <h3>Pricing Options</h3>
            <div className="pricing-options">
                <div className="pricing-option">
                    <input
                        type="checkbox"
                        id="pricing-paid"
                    />
                    <label htmlFor="pricing-paid">Paid</label>
                </div>
                <div class="pricing-option">
                    <input
                         type="checkbox"
                         id="pricing-free"
                    />
                    <label htmlFor="pricing-free">Free</label>
                </div>
                <div class="pricing-option">
                    <input
                         type="checkbox"
                         id="pricing-view-only"
                    />
                    <label htmlFor="pricing-view-only">View Only</label>
                </div>
            </div>
        </div>
    );
};

export default PricingFilters;