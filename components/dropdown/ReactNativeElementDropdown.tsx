import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTheme } from '@/context/ThemeContext'; // Ensure the path is correct

type DropdownItem = {
  label: string;
  value: string | number;
};

interface ReactNativeElementDropdownComponentProps {
  data: DropdownItem[];
  labelField?: keyof DropdownItem;
  valueField?: keyof DropdownItem;
  placeholder?: string;
  searchPlaceholder?: string;
  currentSelection: string | number | null;
  onChange: (value: string | number) => void;
  label?: string;
  icon?: string;
}

const ReactNativeElementDropdownComponent: React.FC<ReactNativeElementDropdownComponentProps> = ({
  data,
  labelField = 'label',
  valueField = 'value',
  placeholder = 'Select item',
  searchPlaceholder = 'Search...',
  currentSelection,
  onChange,
  label = '',
  icon = 'Safety',
}) => {
  const { currentTheme } = useTheme(); // Get the current theme
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => (currentSelection || isFocus) ? (
    <Text style={[styles.label, { color: isFocus ? currentTheme.colors.primary : currentTheme.colors.text }]}>
      {label}
    </Text>
  ) : null;

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: currentTheme.colors.primary }]}
        placeholderStyle={[styles.placeholderStyle, { color: currentTheme.colors.text }]}
        selectedTextStyle={[styles.selectedTextStyle, { color: currentTheme.colors.text }]}
        inputSearchStyle={[styles.inputSearchStyle, { color: currentTheme.colors.text }]}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField={labelField}
        valueField={valueField}
        placeholder={isFocus ? '...' : placeholder}
        searchPlaceholder={searchPlaceholder}
        value={currentSelection ? String(currentSelection) : null}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onChange(item[valueField]);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? currentTheme.colors.primary : currentTheme.colors.text}
            name={icon}
            size={20}
          />
        )}
      />
    </View>
  );
};

export default ReactNativeElementDropdownComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray', // Default color, will be overridden by theme
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    left: 5,
    top: -5,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
