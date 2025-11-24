import {useAppDispatch, useAppSelector} from '../store/hooks';
import { togglePricingoption } from '../features/filters/filterSlice';
import { PricingOption } from '../types';

const PricingFilters = () => {
    const dispatch = useAppDispatch();
    const selectedOptions = useAppSelector((state) => state.filters.pricingOptions);

    const handleToggle = (option) => {
        dispatch(togglePricingoption(option));
    };

    const isChecked = (option) => selectedOptions.includes(option);
    return (
        <div className="pricing-filters">
            <h3>Pricing Options</h3>
            <div className="pricing-options">
                <div className="pricing-option">
                    <input
                        type="checkbox"
                        id="pricing-paid"
                        checked={isChecked(PricingOption.PAID)}
                        onChange={() => handleToggle(PricingOption.PAID)}
                        data-testid="pricing-paid"
                    />
                    <label htmlFor="pricing-paid">Paid</label>
                </div>
                <div className="pricing-option">
                    <input
                         type="checkbox"
                         id="pricing-free"
                         checked={isChecked(PricingOption.FREE)}
                         onChange={() => handleToggle(PricingOption.FREE)}
                         data-testid="pricing-free"
                    />
                    <label htmlFor="pricing-free">Free</label>
                </div>
                <div className="pricing-option">
                    <input
                         type="checkbox"
                         id="pricing-view-only"
                         checked={isChecked(PricingOption.VIEW_ONLY)}
                         onChange={() => handleToggle(PricingOption.VIEW_ONLY)}
                         data-testid="pricing-view-only"
                    />
                    <label htmlFor="pricing-view-only">View Only</label>
                </div>
            </div>
        </div>
    );
};

export default PricingFilters;