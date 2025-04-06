import React, { createContext, useContext, useState, useEffect } from 'react';

const BrightnessContext = createContext();

export const BrightnessProvider = ({ children }) => {
    const [brightness, setBrightness] = useState(() => {
        const savedBrightness = localStorage.getItem('brightness');
        return savedBrightness ? parseFloat(savedBrightness) : 100;
    });

    useEffect(() => {
        localStorage.setItem('brightness', brightness);
        document.documentElement.style.filter = `brightness(${brightness}%)`;
    }, [brightness]);

    const adjustBrightness = (value) => {
        setBrightness(value);
    };

    return (
        <BrightnessContext.Provider value={{ brightness, adjustBrightness }}>
            {children}
        </BrightnessContext.Provider>
    );
};

export const useBrightness = () => {
    const context = useContext(BrightnessContext);
    if (!context) {
        throw new Error('useBrightness must be used within a BrightnessProvider');
    }
    return context;
}; 