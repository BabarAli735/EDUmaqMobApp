import AsyncStorage from '@react-native-async-storage/async-storage';
import { InstituteDetail, Profile, TeacherProfile } from '..';

export async function setToken(token: string) {
  return await AsyncStorage.setItem('TOKEN', token);
}

export async function getToken(): Promise<string | null> {
  const token = await AsyncStorage.getItem('TOKEN');
  return token;
}

export async function setUserProfile(profile: Profile|TeacherProfile) {
  return await AsyncStorage.setItem('PROFILE', JSON.stringify(profile));
}

export async function getUserProfile(): Promise<Profile | null> {
  const profile = await AsyncStorage.getItem('PROFILE');
  return profile ? JSON.parse(profile) : null;
}

export async function setLanguage(language: string) {
  return await AsyncStorage.setItem('LANGUAGE', language);
}

export async function getLanguage(): Promise<string | null> {
  const language = await AsyncStorage.getItem('LANGUAGE');
  return language ? language : 'en';
}

export async function setInstitute(institute: InstituteDetail) {
  return await AsyncStorage.setItem('INSTITUTE', JSON.stringify(institute));
}

export async function getInstitute(): Promise<InstituteDetail | null> {
  const institute = await AsyncStorage.getItem('INSTITUTE');
  return institute ? JSON.parse(institute) : null;
}

export async function setIntroduction(isIntroduction: boolean) {
  return await AsyncStorage.setItem('INTRODUCTION', String(isIntroduction));
}

export async function isIntroduction() {
  const introduction = await AsyncStorage.getItem('INTRODUCTION');
  return Boolean(introduction);
}

export async function clear() {
  const introduction = await isIntroduction();
  await AsyncStorage.clear();
  return await setIntroduction(introduction);
}
