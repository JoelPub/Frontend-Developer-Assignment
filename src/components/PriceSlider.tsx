import { useState, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setPriceRange } from '../features/filters/filtersSlice';
import { PricingOption } from '../types';

const PriceSlider = () => {
  const dispatch = useAppDispatch();
  const priceRange = useAppSelector((state) => state.filters.priceRange);
  const pricingOptions = useAppSelector((state) => state.filters.pricingOptions);
  const isPaidSelected = pricingOptions?.includes(PricingOption.PAID);

  const [minValue, setMinValue] = useState<number>(priceRange[0]);
  const [maxValue, setMaxValue] = useState<number>(priceRange[1]);

  useEffect(() => {
    setMinValue(priceRange?.[0] ?? 0);
    setMaxValue(priceRange?.[1] ?? 0);
  }, [priceRange]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minNum = Number(e.target.value);
    const value = Math.min(minNum, maxValue - 1);
    setMinValue(value);
  };
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxNum = Number(e.target.value);
    const value = Math.max(maxNum, minValue + 1);
    setMaxValue(value);
  };

  const handleInputCofirm = useCallback(() => {
    dispatch(setPriceRange([minValue, maxValue]));
  }, [dispatch, minValue, maxValue]);

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
            onMouseUp={handleInputCofirm}
            onTouchEnd={handleInputCofirm}
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
            onMouseUp={handleInputCofirm}
            onTouchEnd={handleInputCofirm}
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
