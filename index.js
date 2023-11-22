import { registerRootComponent } from 'expo';
import App from './App';
import { AppRegistry, LogBox } from 'react-native';


// enableScreens();

LogBox.ignoreLogs(['Reanimated 2', 'VirtualizedLists should never be nested', 'Non-serializable values were found in the navigation state']);

LogBox.ignoreAllLogs(true);

registerRootComponent(App);
