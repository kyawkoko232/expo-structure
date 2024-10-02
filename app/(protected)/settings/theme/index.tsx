import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext'; // Theme context
import { useLanguage } from '@/context/LanguageContext'; // Language context
import { useTranslation } from 'react-i18next';
import ReactNativeElementDropdownComponent from '@/components/dropdown/ReactNativeElementDropdown';

const SettingsScreen = () => {
  const { t } = useTranslation();
  const { currentTheme, changeTheme, getThemeKeys } = useTheme();
  const { currentLanguage, changeLanguage, getAvailableLanguages } = useLanguage();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Theme Section */}
        <Text style={[styles.header, { color: currentTheme.colors.text }]}>
          {t("theme.settings")} {/* You can use translation keys for text */}
        </Text>
        <ReactNativeElementDropdownComponent
          data={getThemeKeys().map(themeKey => ({
            label: themeKey === 'auto' ? 'Auto' : themeKey.charAt(0).toUpperCase() + themeKey.slice(1),
            value: themeKey,
          }))}
          currentSelection={currentTheme.name || 'light'} // Fallback to a default theme name
          onChange={changeTheme}
          placeholder={t("theme.select_theme")}
        />

        {/* Language Section */}
        <Text style={[styles.header, { color: currentTheme.colors.text, marginTop: 30 }]}>
          {t("theme.language setting")}
        </Text>
        <Text style={[styles.text, { color: currentTheme.colors.text }]}>
          {t("theme.current_language")}: {currentLanguage} {/* Use translation for the current language label */}
        </Text>
        <ReactNativeElementDropdownComponent
          data={getAvailableLanguages().map(lang => ({ label: lang, value: lang }))}
          currentSelection={currentLanguage}
          onChange={changeLanguage}
          placeholder={t("theme.select_language")}
        />

        {/* Theme Colors Display */}
        <View style={styles.themeColorContainer}>
          <Text style={[styles.header, { color: currentTheme.colors.text }]}>
            {t("theme.colors")} {/* Use translation for the theme colors label */}
          </Text>
          {Object.entries(currentTheme.colors).map(([key, value]) => (
            <View key={key} style={styles.colorItem}>
              <Text style={[styles.colorText, { color: currentTheme.colors.text }]}>
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </Text>
              <View style={[styles.colorBox, { backgroundColor: value }]} />
              <Text style={[styles.colorCode, { color: currentTheme.colors.text }]}>{value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 50,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  themeColorContainer: {
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  colorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  colorText: {
    fontSize: 16,
    flex: 1,
  },
  colorBox: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
    borderRadius: 4,
  },
  colorCode: {
    fontSize: 14,
    flex: 2,
  },
});
