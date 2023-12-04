import { View, Text } from 'react-native';
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    useEffect(() => {
        // Đọc trạng thái Dark Mode từ AsyncStorage khi ứng dụng khởi chạy
        const loadDarkMode = async () => {
            try {
                const storedDarkMode = await AsyncStorage.getItem('darkMode');
                if (storedDarkMode !== null) {
                    setIsDarkMode(JSON.parse(storedDarkMode));
                }
            } catch (error) {
                console.error('Error loading Dark Mode:', error);
            }
        };
        loadDarkMode();
    }, []);
    const toggleTheme = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        // Lưu trạng thái Dark Mode vào AsyncStorage
        AsyncStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    };
    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
export const useTheme = () => {
    return useContext(ThemeContext);
};
