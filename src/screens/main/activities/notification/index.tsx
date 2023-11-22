import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Strings } from '../../../../assets';
import { Container, ContentList, HeaderView } from '../../../../components';
import { Notification } from '../../../../data';
import { useNotificationSelector } from '../../../../redux';
import { format } from '../../../../utils';

export function NotificationScreen() {
  const { isLoading, notifications, error, onRetry } = useNotificationSelector();

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView title={Strings.Notification.TITLE} isSearch />
        <ContentList<Notification>
          items={notifications}
          isLoading={isLoading}
          isRetry={!!error}
          onRetry={() => onRetry()}
          message={error ? error.error.message : Strings.Notification.EMPTY}
          onRender={(item, index) => {
            return (
              <View style={_styles.itemHolder}>
                <View style={_styles.titleHolder}>
                  <Text style={_styles.title}>{item.title}</Text>
                  <Text style={_styles.date}>{format(new Date(item.createdDate), 'DD MMM YYYY hh:mm A')}</Text>
                </View>
                <Text style={{ ..._styles.description, color: item.isViewed == true ? Colors.GRAY : Colors.MESSAGE }}>{item.message}</Text>
              </View>
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
  itemHolder: {
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
  },
  titleHolder: {
    flexDirection: 'row',
    flex: 1,
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'space-between',
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    backgroundColor: Colors.CYAN,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    textAlignVertical: 'center',
    color: Colors.PRIMARY,
  },
  date: {
    fontSize: 16,
    textAlignVertical: 'center',
    color: Colors.MESSAGE,
  },
  description: {
    fontSize: 18,
    padding: 10,
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
    textAlignVertical: 'center',
    color: Colors.MESSAGE,
  },
});
