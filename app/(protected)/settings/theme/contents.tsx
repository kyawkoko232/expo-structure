import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";

const TranslatedContent = () => {
  const { t } = useTranslation();
  const { currentTheme, changeTheme, getThemeKeys } = useTheme();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Text
          style={[
            styles.title,
            { fontFamily: currentTheme.textVariants.titleB.fontFamily },
          ]}
        >
          {t("home.title")}
        </Text>

        <Text style={[styles.paragraph,]}>{t("home.welcome")}</Text>
        <Text style={styles.paragraph}>{t("home.subtitle")}</Text>
        <Text style={styles.paragraph}>{t("home.description")}</Text>
        <Text style={styles.paragraph}>{t("home.exploringLanguages")}</Text>
        <Text style={styles.paragraph}>
          {t("home.exploringLanguagesDescription")}
        </Text>
        <Text style={styles.paragraph}>{t("home.learnMore")}</Text>
        <Text style={styles.paragraph}>{t("home.repositoryLinkText")}</Text>
        <Text style={styles.paragraph}>{t("home.articlesLinkText")}</Text>

        <Text style={[
            styles.title,
            { fontFamily: currentTheme.textVariants.primary.fontFamily },
          ]}>{t("features.title")}</Text>
        {Object.entries(
          t("features.collapsibles", { returnObjects: true })
        ).map(([key]) => (
          <View key={key} style={styles.collapsible}>
            <Text style={styles.subtitle}>
              {t(`features.collapsibles.${key}.title`)}
            </Text>
            <Text style={styles.paragraph}>
              {t(`features.collapsibles.${key}.description`)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 4,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 8,
  },
  collapsible: {
    marginBottom: 12, // Adds spacing between collapsibles
  },
});

export default TranslatedContent;
