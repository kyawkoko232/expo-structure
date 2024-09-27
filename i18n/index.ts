import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import translationEn from "./locales/en-US/translation.json";
import translationPt from "./locales/pt-BR/translation.json";
import translationRu from "./locales/ru-RU/translation.json";
import translationZh from "./locales/zh-CN/translation.json";
import translationEs from "./locales/es-ES/translation.json";
import translationIt from "./locales/it-IT/translation.json";
import translationHi from "./locales/hi-IN/translation.json";
import translationMM from "./locales/mm-MM/translation.json";

// Configuração das traduções
const resources = {
  "pt-BR": { translation: translationPt },
  "en-US": { translation: translationEn },
  "es-ES": { translation: translationEs },
  "ru-RU": { translation: translationRu },
  "zh-CN": { translation: translationZh },
  "it-IT": { translation: translationIt },
  "hi-IN": { translation: translationHi },
  "mm-MM": { translation: translationMM },
};

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem("language");

  if (!savedLanguage) {
    const locales = Localization.getLocales();
    savedLanguage = locales.length > 0 ? locales[0].languageTag : "en-US"; // Default to English if no locale found
  }

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources,
    lng: savedLanguage,
    fallbackLng: "en-US",
    interpolation: {
      escapeValue: false,
    },
  });
};

// Initialize i18n
initI18n();

export default i18n;
