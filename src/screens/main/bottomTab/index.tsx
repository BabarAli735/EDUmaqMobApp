import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import { IconProps } from 'react-native-paper/lib/typescript/components/MaterialCommunityIcon';
import { Screens } from '../..';
import { Colors, Icon, Icons, Strings } from '../../../assets';
import { HelpScreen } from './help';
import { HomeScreen } from './home';
import { TeacherHomeScreen } from './teachersHome';
import { LearnScreen } from './learn';
import { MoreScreen } from './more';
import { useAuthenticationSelector } from '../../../redux';
import { TeacherProfileScreen } from '../teacher/profile';
import { TeacherMore } from '../teacher/moreIntract';
import { TeacherHelp } from '../teacher/help';
import { TeacherTimeTable } from '../teacher/timeTable';
import { TeacherModuleStudents } from '../teacher/students';
import { MarksEntry } from '../teacher/marksEntry';
export function BottomNavigator() {
  const [index, setIndex] = React.useState(0);
  const { profile } = useAuthenticationSelector();
  const isEmployee = profile?.userType !== 'Student';

  const TEACHER_ROUTES = [
    {
      key: Screens.HOME,
      title: Strings.Main.TEACHER_HOME,
      icon: require('../../../assets/icons/ic_home.png'),
    },
    {
      key: Screens.TEACHER_TIMETABLE,
      title: Strings.Main.TEACHER_TIMETABLE,
      icon: require('../../../assets/icons/ic_clock.png'),
    },
    {
      key: Screens.TEACHER_STUDENTS,
      title: Strings.Main.TEACHER_STUDENTS,
      icon: require('../../../assets/icons/ic_profile.png'),
    },

    {
      key: Screens.TEACHER_MORE_INTRACT,
      title: Strings.Main.TEACHER_MORE,
      icon: require('../../../assets/icons/ic_home.png'),
    },
  ];
  const STUDENT_ROUTES = [
    {
      key: Screens.HOME,
      title: Strings.Main.HOME,
      icon: require('../../../assets/icons/ic_home.png'),
    },
    {
      key: Screens.LEARN,
      title: Strings.Main.LEARN,
      icon: require('../../../assets/icons/ic_learn.png'),
    },
    {
      key: Screens.HELP,
      title: Strings.Main.HELP,
      icon: require('../../../assets/icons/ic_ask.png'),
    },
    {
      key: Screens.MORE,
      title: Strings.Main.MORE,
      icon: require('../../../assets/icons/ic_more.png'),
    },
  ];
  const [routes] = React.useState(isEmployee ? TEACHER_ROUTES : STUDENT_ROUTES);

  const renderIcon = ({ route, color }) => {
    return <Image source={route.icon} style={{ tintColor: color, width: 25, height: 25 }} />;
  };

  const STUDENT = {
    [Screens.HOME]: HomeScreen,
    [Screens.LEARN]: LearnScreen,
    [Screens.HELP]: HelpScreen,
    [Screens.MORE]: MoreScreen,
  };
  const TEACHER = {
    [Screens.TEACHER_HOME]: TeacherHomeScreen,
    [Screens.TEACHER_TIMETABLE]: TeacherTimeTable,
    [Screens.TEACHER_STUDENTS]: TeacherModuleStudents,
    [Screens.TEACHER_MORE_INTRACT]: TeacherMore,
  };
  return (
    <BottomNavigation
      navigationState={{ index, routes } as any}
      onIndexChange={setIndex}
      shifting={false}
      activeColor={Colors.WHITE}
      inactiveColor={Colors.LIGHT_GRAY}
      barStyle={_styles.bottomBar}
      renderIcon={renderIcon}
      renderScene={BottomNavigation.SceneMap(isEmployee ? TEACHER : STUDENT)}
    />
  );
}

const _styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: Colors.ACCENT,
  },
});
