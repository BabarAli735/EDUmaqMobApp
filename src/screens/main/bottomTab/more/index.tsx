import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Screens } from '../../..';
import { Colors, Icon, Strings } from '../../../../assets';
import { Container, HeaderView } from '../../../../components';
import { useInstituteSelector, useMainNavigator } from '../../../../redux';
import { MoreMenus } from '../../../../utils';

export function MoreScreen() {
  const { navigation } = useMainNavigator();
  const { institute } = useInstituteSelector();

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView title={Strings.Main.MORE} isDrawer isSearch isNotification />
        <FlatList
          data={MoreMenus}
          style={{ padding: 20 }}
          keyExtractor={(_, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={[_styles.menuContainer]}
                onPress={() => {
                  if (item.id === 0) {
                    navigation.navigate(Screens.WEB, {
                      title: item.name,
                      url: institute?.websiteURL,
                    });
                  }
                  if (item.id === 2) {
                    navigation.navigate(Screens.PAYMENT_HISTORY, {
                      title: item.name,
                    });
                  }
                  if (item.id === 3) {
                    navigation.navigate(Screens.CUSTOMER_CARE, {
                      title: item.name,
                    });
                  }
                  if (item.id === 4) {
                    navigation.navigate(Screens.TERMS, {
                      title: item.name,
                    });
                  }
                }}>
                <Icon icon={item.icon} size={20} color={Colors.PRIMARY} />
                <Text style={_styles.menuName}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </Container>
    </Container>
  );
}

const _styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.ACCENT,
  },
  container: {
    backgroundColor: Colors.PRIMARY,
  },
  menuContainer: {
    padding: 10,
    flex: 1,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
  },
  menuName: {
    flex: 1,
    fontSize: 18,
    marginStart: 10,
    color: Colors.PRIMARY,
  },
});
