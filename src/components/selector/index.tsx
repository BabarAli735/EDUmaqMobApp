import React from 'react';
import { View, ViewStyle } from 'react-native';
import { InputTextView } from '..';
import { Icon, Icons } from '../../assets';
import { useModalNavigator } from '../../redux';
import { Modals, PicketItem } from '../../screens';

interface Props {
  items: PicketItem[];
  value?: PicketItem | string | number;
  label?: string;
  onSelect?: (item: PicketItem) => void;
  style?: ViewStyle | undefined;
}

export function SelectionInput({ value, label, items, onSelect, style }: Props) {
  const [inputValue, setInputValue] = React.useState<PicketItem | undefined>();
  const { navigation } = useModalNavigator();

  React.useEffect(() => {
    if (typeof value === 'string' || typeof value === 'number') {
      const item = items.filter(item => {
        return item.value.toString() === value.toString() || item.id.toString() == value.toString();
      });

      if (item && item.length > 0) {
        setInputValue(item[0]);
      } else {
        setInputValue(undefined);
      }
    } else {
      setInputValue(value);
    }
  }, [value]);

  return (
    <View>
      <InputTextView
        style={style}
        placeHolder={label ? label : 'Select'}
        value={inputValue?.value}
        isEditable={false}
        rightIcon={props => <Icon {...props} icon={Icons.IC_ARROW_LEFT} rotation={'270deg'} />}
        onPress={() => {
          if (items && items.length > 0) {
            navigation.navigate(Modals.ITEM_ICKER, {
              items: items,
              title: label,
              selected: inputValue,
              onSelect: (item: PicketItem) => {
                setInputValue(item);
                onSelect && onSelect(item);
              },
            });
          }
        }}
      />
    </View>
  );
}
