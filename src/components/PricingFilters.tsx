import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { togglePricingOption } from '../features/filters/filtersSlice';
import { PricingOption } from '../types';

const PRICING_OPTIONS_PROPS = [
  {
    key: PricingOption.PAID,
    id: 'pricing-paid',
    title: 'Paid',
  },
  {
    key: PricingOption.FREE,
    id: 'pricing-free',
    title: 'Free',
  },
  {
    key: PricingOption.VIEW_ONLY,
    id: 'pricing-view-only',
    title: 'View Only',
  },
];

const PricingFilters = () => {
  const dispatch = useAppDispatch();
  const selectedOptions = useAppSelector((state) => state.filters.pricingOptions);

  const handleToggle = (option: PricingOption) => {
    dispatch(togglePricingOption(option));
  };

  const isChecked = useCallback(
    (option: PricingOption) => selectedOptions?.includes(option) ?? false,
    [selectedOptions]
  );

  return (
    <div className="pricing-filters">
      <div className="pricing-options">
        <h3>Pricing Option</h3>

        {PRICING_OPTIONS_PROPS.map((opt) => {
          const { key, id, title } = opt;

          return (
            <div className="pricing-option" key={key}>
              <input
                type="checkbox"
                id={id}
                checked={isChecked(key)}
                onChange={() => handleToggle(key)}
                data-testid={id}
              />
              <label htmlFor={id}>{title}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PricingFilters;
