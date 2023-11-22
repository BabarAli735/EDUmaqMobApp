import React from 'react';
import { Image, ImageSourcePropType, ImageStyle } from 'react-native';

export const Images = {
  IC_LOGO_I: require('./ic_logo_i.png'),
  IC_AUTH_HEADER: require('./ic_auth_header.png'),
  IMG_WELCOME: require('./img_welcome.png'),
  IMG_INTRO_STUDENT: require('./img_intro_student.png'),
  IMG_INTRO_TEACHER: require('./img_intro_teacher.png'),
  IMG_INTRO_ADMIN: require('./img_intro_admin.jpg'),
  IMG_PATTERN_HEADER: require('./img_pattern_header.png'),
  IMG_PATTERN_HEADER_HOME: require('./img_pattern_header_home.png'),
  IMG_PATTERN_TEACHER: require('./img_pattern_teacher.png'),
  IMG_OTP_HEADER: require('./img_otp_header.png'),
  IMG_DRAWER_BANNER: require('./ic_drawer_banner.png'),
  IMG_SCHOOL_BANNER: require('./img_school.jpg'),
  LOGIN_BANNER: require('./login_banner.png'),
};

interface Props {
  icon: ImageSourcePropType | string;
  size?: number;
  style?: ImageStyle;
}

export function ImageView({ size, icon, style }: Props) {
  return <Image source={typeof icon == 'string' ? { uri: icon } : icon} style={{ width: size, height: size, ...style }} />;
}
