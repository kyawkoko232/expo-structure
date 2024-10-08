import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/context/ThemeContext'
import useAuth from '@/helpers/useAuth';
import { textVariants } from '@/theme/textVariants';
import { useTranslation } from 'react-i18next';

const LogoutButton = () => {
    const {currentTheme} = useTheme();
    const { t } = useTranslation();
    const { session, handleSignOut } = useAuth();
  return (
    <View>
      <TouchableOpacity
            style={{
              backgroundColor: currentTheme.colors.primary,
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 8,
              marginVertical: 10,
              width: "80%",
              alignItems: "center",
            }}
            onPress={handleSignOut} // Sign out button handler
            accessibilityLabel="Sign Out"
          >
            <Text
              style={{
                ...textVariants.default,
                color: currentTheme.colors.textOpposite,
              }}
            >
              {t("auth.signOut")}
            </Text>
          </TouchableOpacity>
    </View>
  )
}

export default LogoutButton

const styles = StyleSheet.create({})