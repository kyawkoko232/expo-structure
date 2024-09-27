import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '@/i18n'; // Adjust the path to where your i18n setup is located
import * as Localization from 'expo-localization';

// Define the shape of the context data
interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (languageCode: string) => Promise<void>;
  getAvailableLanguages: () => string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// Language options available in the app
const availableLanguages = [ 'en-US', 'mm-MM','es-ES', 'ru-RU', 'zh-CN', 'it-IT', 'hi-IN',  'pt-BR',];

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('en-US'); // Default language

  useEffect(() => {
    const loadLanguage = async () => {
      let savedLanguage = await AsyncStorage.getItem('language');
      if (!savedLanguage) {
        // Get the first locale from the device settings
        const deviceLocale = Localization.getLocales()[0]?.languageTag || 'en-US'; // Fallback to 'en-US' if undefined
        savedLanguage = deviceLocale;
      }
      setCurrentLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage); // Set i18n language
      console.log('Loaded language:', savedLanguage); // Debugging: check the loaded language
    };
    loadLanguage();
  }, []);

  const changeLanguage = async (languageCode: string) => {
    setCurrentLanguage(languageCode);
    await AsyncStorage.setItem('language', languageCode);
    i18n.changeLanguage(languageCode); // Update i18n language
    console.log('Language changed to:', languageCode); // Debugging: check if the language change was successful
  };

  const getAvailableLanguages = () => availableLanguages;

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, getAvailableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
