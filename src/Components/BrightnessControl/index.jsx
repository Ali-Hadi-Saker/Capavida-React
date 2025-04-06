import React from 'react';
import { useTheme } from '../../context/BrightnessContext';
import './style.css';

const BrightnessControl = () => {
    const { brightness, adjustBrightness, isDarkMode, toggleTheme } = useTheme();

    return (
        <div className="controls-container">
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
            <button 
                className="theme-toggle" 
                onClick={toggleTheme}
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
                <i className={`fa ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
        </div>
    );
};

export default BrightnessControl; 