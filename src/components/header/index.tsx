import { DrawerActions } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { IconButton, IconButtonMenu } from '..';
import { Colors, Icons } from '../../assets';
import { useDrawerNavigator, useMainNavigator } from '../../redux';
import { Screens } from '../../screens';
import { responsiveFontSize as rf} from '../../common';

interface Props {
  title?: string;
  isDrawer?: boolean;
  isSearch?: boolean;
  isNotification?: boolean;
  color?: string;
}

export function HeaderView({ title, isDrawer, isSearch, isNotification, color }: Props) {
  const { navigation } = useMainNavigator();
  const { drawer } = useDrawerNavigator();

  return (
    <Appbar style={{ ..._styles.container, backgroundColor: color ? color : Colors.ACCENT }}>
      {isDrawer ? (
        <IconButtonMenu
          icon={isDrawer ? Icons.IC_MENU_SIDE : Icons.IC_ARROW_LEFT}
          onPress={() => {
            if (!isDrawer) {
              navigation.goBack();
            } else {
              drawer.dispatch(DrawerActions.openDrawer());
            }
          }}
        />
      ) : (
        <IconButton
          icon={isDrawer ? Icons.IC_MENU_SIDE : Icons.IC_ARROW_LEFT}
          onPress={() => {
            if (!isDrawer) {
              navigation.goBack();
            } else {
              drawer.dispatch(DrawerActions.openDrawer());
            }
          }}
        />
      )}

      <Text style={_styles.title} numberOfLines={1} ellipsizeMode={'tail'}>
        {title ? title : ''}
      </Text>
      <View style={_styles.menus}>
        {isSearch && <IconButton icon={Icons.IC_SEARCH} onPress={() => navigation.navigate(Screens.SEARCH)} />}
        {isNotification && <IconButton icon={Icons.IC_NOTIFICATION} onPress={() => navigation.navigate(Screens.NOTIFICATION)} />}
      </View>
    </Appbar>
  );
}

const _styles = StyleSheet.create({
  container: {
    start: 0,
    end: 0,
    elevation: 0,
  },
  title: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    fontSize: rf(2.5),
    marginStart: 5,
    flex: 1,
  },
  menus: {
    flexDirection: 'row',
  },
});
