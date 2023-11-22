import React from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { Colors } from '../../../assets';
import { Container, HeaderView, LoadingIndicator } from '../../../components';
import { useMainNavigator } from '../../../redux';

export function WebViewScreen() {
  const { route } = useMainNavigator();
  
  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView title={route.params?.title} isSearch isNotification />
        <View style={{ flex: 1 }}>
          {route.params?.title && (
            <WebView
              style={{ justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 40 }}
              startInLoadingState={true}
              source={{ uri: route.params.url ?? '' }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              renderLoading={() => {
                return <LoadingIndicator color={Colors.PRIMARY} />;
              }}
            />
          )}
        </View>
      </Container>
    </Container>
  );
}

const _styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  container: {
    backgroundColor: Colors.PRIMARY,
  },
});
