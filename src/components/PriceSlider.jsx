import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setPriceRange } from "../features/filters/filterSlice";
import { PricingOption } from "../types";

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

    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), maxValue -1);
        setMinValue(value);
    };
    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), minValue + 1);
        setMaxValue(value);
    };

    const handleMinInputChange = (e) => {
        const value = Math.max(0, Math.min(Number(e.target.value), maxValue - 1));
        setMinValue(value);
        dispatch(setPriceRange([value, maxValue]));
    };

    const handleMaxInputChange = (e) => {
        const value = Math.min(999, Math.max(Number(e.target.value), minValue + 1));
        setMaxValue(value);
        dispatch(setPriceRange([minValue, value]));
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
            <h3>Price Range</h3>
            <div className={`price-slider ${!isPaidSelected ? "disabled" : ""}`}>
                <div className="price-inputs">
                    <div className="price-input-group">
                        <label>Min</label>
                        <input
                            type="number"
                            min="0"
                            max="999"
                            value={minValue}
                            onChange={handleMinInputChange}
                            disabled={!isPaidSelected}
                            data-testid="price-min-group"
                        />
                    </div>
                    <div className="price-input-group">
                        <label>Max</label>
                        <input
                            type="number"
                            min="0"
                            max="999"
                            value={maxValue}
                            onChange={handleMaxInputChange}
                            disabled={!isPaidSelected}
                            data-testid="price-max-group"
                        />
                    </div>
                </div>
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
            </div>
        </div>
    );
};
export default PriceSlider;
