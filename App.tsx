import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Persister, Store } from './src/redux';
import { RootNavigator } from './src/router';
import { Provider as PaperProvider } from 'react-native-paper';
export default function App() {
  return (
    <Provider store={Store}>
      <PersistGate loading={<ActivityIndicator />} persistor={Persister}>
        <PaperProvider>
          <RootNavigator />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ECF0F1',
  },
  buttonsContainer: {
    padding: 10,
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 8,
  },
});
