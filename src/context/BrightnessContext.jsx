import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [brightness, setBrightness] = useState(() => {
        const savedBrightness = localStorage.getItem('brightness');
        return savedBrightness ? parseFloat(savedBrightness) : 100;
    });

    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? savedTheme === 'dark' : false;
    });

    useEffect(() => {
        localStorage.setItem('brightness', brightness);
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        document.documentElement.style.filter = `brightness(${brightness}%)`;
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }, [brightness, isDarkMode]);

    const adjustBrightness = (value) => {
        setBrightness(value);
    };

    const toggleTheme = () => {
        setIsDarkMode(prev => !prev);
    };

    return (
        <ThemeContext.Provider value={{ brightness, adjustBrightness, isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}; 