import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setPriceRange } from '../features/filters/filtersSlice';
import { PricingOption } from '../types';

const PriceSlider = () => {
  const dispatch = useAppDispatch();
  const priceRange = useAppSelector((state) => state.filters.priceRange);
  const pricingOptions = useAppSelector((state) => state.filters.pricingOptions);
  const isPaidSelected = pricingOptions.includes(PricingOption.PAID);

  const [minValue, setMinValue] = useState(priceRange[0]);
  const [maxValue, setMaxValue] = useState(priceRange[1]);

  useEffect(() => {
    setMinValue(priceRange[0]);
    setMaxValue(priceRange[1]);
  }, [priceRange]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue(value);
  };
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(value);
  };

  const handleMinMouseUp = () => {
    dispatch(setPriceRange([minValue, maxValue]));
  };

  const handleMaxMouseUp = () => {
    dispatch(setPriceRange([minValue, maxValue]));
  };

  const trackLeft = (minValue / 999) * 100;
  const trackWidth = ((maxValue - minValue) / 999) * 100;

  return (
    <div className="price-slider-section">
      <div className={`price-slider ${!isPaidSelected ? 'disabled' : ''}`}>
        <span className="price-value">${minValue}</span>
        <div className="range-slider">
          <div className="range-track" style={{ left: `${trackLeft}%`, width: `${trackWidth}%` }} />
          <input
            type="range"
            min="0"
            max="999"
            value={minValue}
            onChange={handleMinChange}
            onMouseUp={handleMinMouseUp}
            onTouchEnd={handleMinMouseUp}
            className="range-input"
            disabled={!isPaidSelected}
            data-testid="price-min-slider"
          />
          <input
            type="range"
            min="0"
            max="999"
            value={maxValue}
            onChange={handleMaxChange}
            onMouseUp={handleMaxMouseUp}
            onTouchEnd={handleMaxMouseUp}
            className="range-input"
            disabled={!isPaidSelected}
            data-testid="price-max-slider"
          />
        </div>
        <span className="price-value">${maxValue}</span>
      </div>
    </div>
  );
};
export default PriceSlider;
