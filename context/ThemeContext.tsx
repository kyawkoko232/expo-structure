import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { themes, Theme } from '@/theme/theme'; // Adjust the import path and Theme as necessary
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

// Define the shape of the context data
interface ThemeContextType {
    currentTheme: Theme;
    changeTheme: (themeName: keyof typeof themes) => Promise<void>;
    getThemeKeys: () => (keyof typeof themes)[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const colorScheme = useColorScheme(); // Get the current color scheme (light or dark)
    const [currentTheme, setCurrentTheme] = useState<Theme>(themes.light); // Default theme

    useEffect(() => {
        const loadTheme = async () => {
            const savedTheme = await AsyncStorage.getItem('appTheme');
            console.log("Loaded saved theme:", savedTheme);
            if (savedTheme && themes[savedTheme as keyof typeof themes]) {
                setCurrentTheme(themes[savedTheme as keyof typeof themes]);
            } else {
                setCurrentTheme(themes.light); // Fallback to light theme
            }
        };
        loadTheme();
    }, []);

    useEffect(() => {
        // If the user has selected 'auto', set the theme based on the device's color scheme
        const applyAutoTheme = async () => {
            const savedTheme = await AsyncStorage.getItem('appTheme');
            if (savedTheme === 'auto') {
                setCurrentTheme(colorScheme === 'dark' ? themes.dark : themes.light);
            }
        };

        applyAutoTheme(); // Apply the auto theme whenever the color scheme changes
    }, [colorScheme]);

    const getThemeKeys = () => Object.keys(themes) as (keyof typeof themes)[];

    const changeTheme = async (themeName: keyof typeof themes) => {
        if (themeName === 'auto') {
            // Handle auto theme separately
            setCurrentTheme(colorScheme === 'dark' ? themes.dark : themes.light);
        } else {
            setCurrentTheme(themes[themeName]);
        }
        console.log("ThemeContext Changed theme to:", themeName);
        await AsyncStorage.setItem('appTheme', themeName);
    };

    return (
        <ThemeContext.Provider value={{ currentTheme, changeTheme, getThemeKeys }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use the theme context
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
