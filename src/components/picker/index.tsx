import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Button, Divider, Menu } from 'react-native-paper';
import { Colors, Icon } from '../../assets';
import { responsiveFontSize as rf, widthPercentageToDP as wp} from '../../common';

type Props = {
  title: string;
  value: string;
  data: any[];
  layout: string;
  width?: string | number;
  dataKey: string;
  onSelect: (res: object) => void;
};

const Picker = ({ data, dataKey, width, layout = '1', value, onSelect, title }: Props) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
  contentStyle={{width:wp(30)}}
      anchor={
        layout == '1' ? (
          <TouchableOpacity onPress={openMenu} style={styles.container}>
            {/* <Text style={[styles.titleStyle, { fontSize: 15 }]}>{title} </Text> */}
            <Text style={[styles.titleStyle, { paddingHorizontal: 0, fontSize: rf(1.7) }]}>{value || ''}</Text>
            <View style={{ top: 2, paddingLeft: 6 }}>
              <Icon size={rf(1.7)} color={Colors.PRIMARY} icon={require('../../assets/icons/ic_arrow_down.png')} />
            </View>
            <View style={styles.borderLine} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={openMenu} style={[styles.container, { justifyContent: 'center', paddingHorizontal: 10 }]}>
            <Text style={[styles.titleStyle, { width: width || '80%', fontSize: rf(1.7), textAlign: 'center', paddingHorizontal: 10 }]}>{value || title} </Text>
            <View style={styles.borderLine} />
            <View style={{ top: 2 }}>
              <Icon size={10} color={Colors.PRIMARY} icon={require('../../assets/icons/ic_arrow_down.png')} />
            </View>
            <View style={styles.borderLine} />
          </TouchableOpacity>
        )
      }>
      {data &&
        data?.map((e, x) => (
          <Menu.Item
          titleStyle={[{fontSize:rf(1.7),fontWeight:'600',color:Colors.PRIMARY}]}
          contentStyle={{}}
            onPress={() => {
              // console.log(e[dataKey], dataKey);
              onSelect && onSelect(e);
              closeMenu();
            }}
            title={e[dataKey] || e?.label || ''}
          />
        ))}
    </Menu>
  );
};

export default Picker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleStyle: { color: Colors.PRIMARY, fontWeight: '500', paddingHorizontal: 5 },
  borderLine: { width: 1, height: 25, marginHorizontal: 10, borderLeftWidth: 2, borderColor: Colors.LIGHT_GRAY },
});
