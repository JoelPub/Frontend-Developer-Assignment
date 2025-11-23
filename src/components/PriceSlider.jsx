import { useState } from "react";
import { PricingOption } from "../types";
const PriceSlider = () => {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(999);
    const trackLeft = (minValue / 999) * 100;
    const trackWidth = ((maxValue - minValue) / 999) * 100;

    return (
        <div className="price-slider-section">
            <h3>Price Range</h3>
            <div className={`price-slider`}>
                <div className="price-inputs">
                    <div className="price-input-group">
                        <label>Min</label>
                        <input
                            type="number"
                            min="0"
                            max="999"
                            value={minValue}
                        />
                    </div>
                    <div className="price-input-group">
                        <label>Max</label>
                        <input
                            type="number"
                            min="0"
                            max="999"
                            value={maxValue}
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
                        className="range-input"
                    />
                    <input
                        type="range"
                        min="0"
                        max="999"
                        value={maxValue}
                        className="range-input"
                    />
                </div>
            </div>
        </div>
    );
};
export default PriceSlider;
