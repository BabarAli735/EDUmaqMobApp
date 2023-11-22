import React from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { Colors, Icon, Icons, Strings } from '../../../../assets';
import { ButtonView, Container, ContentList, HeaderView } from '../../../../components';
import { HomeworkDetail } from '../../../../data';
import { useHomeworkSelector, useMainNavigator } from '../../../../redux';
import { Screens } from '../../../index';

const TabComponent = ({ weight, title, isSelected, onPress }: { weight: number; title: string; isSelected: boolean; onPress: () => void }) => {
  return (
    <TouchableOpacity
      style={{
        ..._styles.tab,
        flex: weight,
        borderBottomWidth: isSelected ? 1.5 : 0,
        borderBottomColor: isSelected ? Colors.WHITE : Colors.NORMAL_TAB,
      }}
      onPress={() => onPress()}>
      <Text style={{ ..._styles.tabTitle, color: isSelected ? Colors.WHITE : Colors.NORMAL_TAB }}>{title}</Text>
    </TouchableOpacity>
  );
};

export function HomeworkScreen() {
  const { navigation } = useMainNavigator();

  const { tab, setTab, isLoading, homework, error, onRetry } = useHomeworkSelector();

  const [isHomework, setHomework] = React.useState<boolean>(false);

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView title={Strings.Homework.TITLE} isSearch isNotification />
        <View style={_styles.tabs}>
          <TabComponent weight={0.5} title={'All'} isSelected={tab === 0} onPress={() => setTab(0)} />
          <TabComponent weight={0.8} title={'Videos'} isSelected={tab === 1} onPress={() => setTab(1)} />
          <TabComponent weight={0.8} title={'Images'} isSelected={tab === 2} onPress={() => setTab(2)} />
          <TabComponent weight={1.0} title={'Documents'} isSelected={tab === 3} onPress={() => setTab(3)} />
          <TabComponent weight={0.7} title={'Links'} isSelected={tab === 4} onPress={() => setTab(4)} />
        </View>
        <ContentList<HomeworkDetail>
          items={homework}
          isLoading={isLoading}
          isRetry={!!error}
          onRetry={() => onRetry()}
          onRefresh={() => onRetry()}
          message={error ? error.error.message : Strings.Homework.EMPTY}
          onRender={(item, index) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate(Screens.HOMEWORK_DETAIL_SCREEN as any, { item: item } as any)} style={_styles.itemHolder}>
                <Text style={_styles.extension}>{(item.documentExtension ?? 'NONE').toUpperCase()}</Text>
                <View style={_styles.content}>
                  <Text style={_styles.title}>{item.homeWorkTitle}</Text>
                  <Text style={_styles.subtitle}>{item.homeWorkTitle}</Text>
                  <Text style={_styles.subtitle}>{item.pageCount + ' Pages / ' + item.documentFileSize}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : undefined}>
          {isHomework && (
            <View style={_styles.footer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={_styles.uploadHomeWork}>Upload Homework</Text>
                <TouchableOpacity onPress={() => setHomework(false)}>
                  <Icon icon={Icons.IC_ARROW_LEFT} size={25} color={Colors.PRIMARY} rotation={'270deg'} />
                </TouchableOpacity>
              </View>
              <View style={_styles.media}>
                <View style={_styles.iconHolder}>
                  <Icon icon={Icons.IC_CAMERA} size={40} color={Colors.WHITE} />
                </View>
                <View style={_styles.iconHolder}>
                  <Icon icon={Icons.IC_GALLERY} size={40} color={Colors.WHITE} />
                </View>
                <View style={_styles.iconHolder}>
                  <Icon icon={Icons.IC_PDF} size={40} color={Colors.WHITE} />
                </View>
              </View>
              <ButtonView title={Strings.Homework.BUTTON} style={_styles.uploadBtn} isLoading={isLoading} onPress={() => {}} />
              {/*<TouchableOpacity style={{alignSelf: 'center', padding: 10, marginTop: 10}}*/}
              {/*                  onPress={() => setHomework(false)}>*/}
              {/*    <Text style={{color: Colors.ACCENT}}>{'Close'}</Text>*/}
              {/*</TouchableOpacity>*/}
            </View>
          )}
        </KeyboardAvoidingView>
        {!isHomework && <FAB style={_styles.fabButton} icon={() => <Image source={Icons.IC_PLUS} style={_styles.fabIcon} />} onPress={() => setHomework(true)} />}
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
  tabs: {
    padding: 10,
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    paddingBottom: 10,
    borderBottomWidth: 0,
    borderBottomColor: Colors.WHITE,
  },
  tabTitle: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
  uploadHomeWork: {
    color: Colors.PRIMARY,
    fontSize: 20,
    margin: 5,
    fontWeight: 'bold',
  },
  itemHolder: {
    backgroundColor: Colors.WHITE,
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
  },
  extension: {
    width: 80,
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    textAlignVertical: 'center',
    borderRadius: 5,
    color: Colors.PRIMARY,
    backgroundColor: Colors.CYAN,
  },
  content: {
    padding: 5,
    flexDirection: 'column',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.NORMAL_TAB,
  },
  fabButton: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.ACCENT,
  },
  fabIcon: {
    width: 25,
    height: 25,
    tintColor: Colors.WHITE,
  },
  footer: {
    padding: 10,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    backgroundColor: Colors.WHITE,
  },
  media: {
    padding: 10,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  iconHolder: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: Colors.PRIMARY,
  },
  uploadBtn: {
    marginTop: 10,
    width: '70%',
    marginBottom: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
