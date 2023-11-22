import { DrawerActions } from '@react-navigation/core';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React from 'react';
import { useAuthenticationSelector, useDrawerNavigator, useMainNavigator } from '../../redux';

import Student from './student';
import Teacher from '../teacher/drawer/teacher';

const image = 'https://lh3.googleusercontent.com/ogw/ADea4I4g-ecyjmlL-F6UtGHPeUr2HCHp-GFrF6pWeqKV-g=s192-c-mo';

export function DrawerHeader({ state }: DrawerContentComponentProps) {
  const { profile, logOut } = useAuthenticationSelector();
  const isEmployee = profile?.userType !== 'Student';
  return <>{isEmployee ? <Teacher /> : <Student />}</>;
}
