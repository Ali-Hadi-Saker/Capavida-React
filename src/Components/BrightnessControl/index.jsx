import React from 'react';
import { useBrightness } from '../../context/BrightnessContext';
import './style.css';

const BrightnessControl = () => {
    const { brightness, adjustBrightness } = useBrightness();

    return (
        <div className="brightness-control">
            <i className="fa fa-sun"></i>
            <input
                type="range"
                min="50"
                max="150"
                value={brightness}
                onChange={(e) => adjustBrightness(parseFloat(e.target.value))}
                className="brightness-slider"
                title={`Brightness: ${brightness}%`}
            />
        </div>
    );
};

export default BrightnessControl; 