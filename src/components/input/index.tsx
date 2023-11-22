import React from 'react';
import { KeyboardTypeOptions, StyleSheet, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Colors } from '../../assets';

interface Props {
  value?: string;
  placeHolder?: string;
  isEditable?: boolean;
  numberOfLines?: number;
  multiline?: boolean;
  maxLength?: number;
  keyboardType?: KeyboardTypeOptions;
  style?: ViewStyle | undefined;
  isCenterText?: boolean;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  leftIcon?: ({ size, color }: { size: number; color: string }) => React.ReactNode;
  rightIcon?: ({ size, color }: { size: number; color: string }) => React.ReactNode;
}

export function InputTextView({ value, placeHolder, isEditable, maxLength, keyboardType, style, isCenterText, onChangeText, onPress, leftIcon, rightIcon, numberOfLines, multiline }: Props) {
  return (
    <TouchableOpacity activeOpacity={1} style={[_styles.container, style, { borderColor: value ? Colors.PRIMARY : Colors.GRAY }]} onPress={() => onPress && onPress()}>
      {leftIcon && <View style={{ marginStart: 10 }}>{leftIcon({ size: 15, color: value ? Colors.PRIMARY : Colors.GRAY })}</View>}
      <TextInput
        placeholder={placeHolder}
        style={{ ..._styles.input, color: value ? Colors.PRIMARY : Colors.GRAY, textAlign: isCenterText === true ? 'center' : 'auto' }}
        editable={isEditable !== false}
        value={value}
        numberOfLines={numberOfLines}
        multiline={multiline}
        keyboardType={keyboardType}
        maxLength={maxLength}
        onChangeText={text => onChangeText && onChangeText(text)}
        onPressOut={() => onPress && onPress()}
      />
      {rightIcon && <View style={{ marginEnd: 10 }}>{rightIcon({ size: 15, color: value ? Colors.PRIMARY : Colors.GRAY })}</View>}
    </TouchableOpacity>
  );
}
export function InputTextAreaView({ value, placeHolder, isEditable, maxLength, keyboardType, style, isCenterText, onChangeText, onPress, leftIcon, rightIcon, numberOfLines, multiline }: Props) {
  return (
    <TouchableOpacity activeOpacity={1} style={[_styles.textAreaContainer, style, { borderColor: value ? Colors.PRIMARY : Colors.GRAY }]} onPress={() => onPress && onPress()}>
      {/* {leftIcon && <View style={{ marginStart: 10 }}>{leftIcon({ size: 15, color: value ? Colors.PRIMARY : Colors.GRAY })}</View>} */}
      <TextInput
        placeholder={placeHolder}
        style={{ ..._styles.area, color: value ? Colors.PRIMARY : Colors.GRAY, textAlignVertical: 'top' }}
        editable={isEditable !== false}
        value={value}
        numberOfLines={numberOfLines}
        multiline={multiline}
        keyboardType={keyboardType}
        maxLength={maxLength}
        onChangeText={text => onChangeText && onChangeText(text)}
        onPressOut={() => onPress && onPress()}
      />
      {/* {rightIcon && <View style={{ marginEnd: 10 }}>{rightIcon({ size: 15, color: value ? Colors.PRIMARY : Colors.GRAY })}</View>} */}
    </TouchableOpacity>
  );
}

const _styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
  },
  textAreaContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderRadius: 10,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    padding: 10,
    height: 40,
  },
  area: {
    flex: 1,
    padding: 10,
    minHeight: 40,
  },
});
