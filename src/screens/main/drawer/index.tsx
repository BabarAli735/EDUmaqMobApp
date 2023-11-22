import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { AttendanceScreen, BottomNavigator, LeaveScreen } from '..';
import { Screens } from '../..';
import { DrawerHeader } from '../../../components';

const Drawer = createDrawerNavigator();

export type DrawerParamsList = {
  [Screens.MAIN]: undefined;
  [Screens.LEAVE_REQUEST]: undefined;
  [Screens.ATTENDANCE]: undefined;
};

export function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false, drawerType: 'front', drawerStyle: { width: '70%' } }} drawerContent={props => <DrawerHeader {...props} />}>
      <Drawer.Screen name={Screens.MAIN} component={BottomNavigator} options={{ title: 'Dashboard' }} />
      <Drawer.Screen name={Screens.LEAVE_REQUEST} component={LeaveScreen} options={{ title: 'Leave' }} />
      <Drawer.Screen name={Screens.ATTENDANCE} component={AttendanceScreen} options={{ title: 'Attendance' }} />
    </Drawer.Navigator>
  );
}
