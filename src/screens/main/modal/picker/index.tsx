import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Strings } from '../../../../assets';
import { HorizontalDivider, RadioButton, VerticalDivider } from '../../../../components';
import { useModalNavigator } from '../../../../redux';

export interface PicketItem {
  id: number;
  value: string;
}

export function ItemPicker() {
  const { navigation, route } = useModalNavigator();
  const [value, setValue] = React.useState<PicketItem | undefined>(route.params.selected);

  return (
    <View style={_styles.container}>
      <View style={_styles.modal} />
      <View style={_styles.modalContent}>
        <Text style={_styles.title}>{Strings.Picker.Title + ' ' + (route?.params?.title ? route?.params?.title : '')}</Text>
        <HorizontalDivider width={1} color={Colors.L_GRAY} />
        <HorizontalDivider width={10} color={Colors.TRANSPARENT} />
        {route.params.items.map((item, index) => {
          return (
            <TouchableOpacity key={index.toString()} style={_styles.items} onPress={() => setValue(item)}>
              <RadioButton isChecked={item.id === value?.id} isDisabled={true} />
              <Text style={_styles.item}>{item.value}</Text>
            </TouchableOpacity>
          );
        })}
        <HorizontalDivider width={10} color={Colors.TRANSPARENT} />
        <HorizontalDivider width={1} color={Colors.L_GRAY} />
        <View style={_styles.buttons}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={{ padding: 10, fontWeight: 'bold', fontSize: 16, color: Colors.PRIMARY }}>{Strings.Common.CANCEL}</Text>
          </TouchableOpacity>
          <VerticalDivider color={Colors.L_GRAY} />
          <TouchableOpacity
            onPress={() => {
              if (value) {
                route.params.onSelect && value && route.params.onSelect(value);
                navigation.goBack();
              }
            }}>
            <Text style={{ padding: 10, fontWeight: 'bold', fontSize: 16, color: Colors.PRIMARY }}>{Strings.Common.CHOOSE}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    position: 'absolute',
    opacity: 0.5,
    backgroundColor: '#000000',
    width: '100%',
    height: '100%',
  },
  modalContent: {
    width: '80%',
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
  },
  title: {
    fontSize: 16,
    paddingTop: 15,
    paddingBottom: 15,
    paddingStart: 20,
    paddingEnd: 20,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
  items: {
    paddingStart: 20,
    paddingEnd: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  item: {
    fontSize: 16,
    color: Colors.PRIMARY,
    marginStart: 10,
  },
  buttons: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-evenly',
  },
});
