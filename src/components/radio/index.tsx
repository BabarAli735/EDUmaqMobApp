import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../assets';

interface Props {
  isChecked: boolean;
  isDisabled?: boolean;
  color?: string;
  onCheckChange?: (isChecked: boolean) => void;
}

export function RadioButton({ isChecked, isDisabled, color, onCheckChange }: Props) {
  const [value, setValue] = React.useState<boolean>(isChecked);

  React.useEffect(() => {
    onCheckChange && onCheckChange(value);
  }, [value]);

  return isDisabled === true ? (
    <View style={{ ..._styles.outer, borderColor: color ? color : Colors.PRIMARY }}>{isChecked && <View style={{ ..._styles.inner, backgroundColor: color ? color : Colors.PRIMARY }} />}</View>
  ) : (
    <TouchableOpacity style={{ ..._styles.outer, borderColor: color ? color : Colors.PRIMARY }} onPress={() => setValue(!value)}>
      {isChecked && <View style={{ ..._styles.inner, backgroundColor: color ? color : Colors.PRIMARY }} />}
    </TouchableOpacity>
  );
}

const _styles = StyleSheet.create({
  outer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.PRIMARY,
  },
  inner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.PRIMARY,
  },
});
