import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

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
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (currentSelection || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          {label}
        </Text>
      );
    }
    return null;
  };

  // Ensure currentSelection is a string (the expected type for value prop)
  const selectedValue = currentSelection ? String(currentSelection) : null;

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField={labelField}
        valueField={valueField}
        placeholder={!isFocus ? placeholder : '...'}
        searchPlaceholder={searchPlaceholder}
        value={selectedValue} // Use string representation of the currentSelection
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onChange(item[valueField]);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? 'blue' : 'black'}
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
    borderColor: 'gray',
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
    borderRadius: 20,
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
