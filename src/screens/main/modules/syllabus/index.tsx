import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Modal } from 'react-native-paper';
import { Colors, Icons, Strings } from '../../../../assets';
import { Container, ContentList, HeaderView, HorizontalDivider } from '../../../../components';
import { Subject } from '../../../../data';
import { useSyllabusSelector } from '../../../../redux';

export function SyllabusScreen() {
  const { isLoading, syllabus, error, retry, syllabusDetail, setSyllabusDetail } = useSyllabusSelector();
  const [isModalVisible, setModalVisible] = React.useState<boolean>(false);

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView title={Strings.Syllabus.TITLE} isSearch isNotification />
        {syllabusDetail && (
          <View style={_styles.header}>
            <View style={{ ..._styles.headerHolder, backgroundColor: Colors.CYAN }}>
              <TouchableOpacity style={{ ..._styles.headerHolder, padding: 0 }} onPress={() => setModalVisible(true)}>
                <Text style={{ ..._styles.subject, fontSize: 20 }}>{syllabusDetail?.termName ?? ''}</Text>
                <Image source={Icons.IC_ARROW_LEFT} style={_styles.arrow} />
              </TouchableOpacity>
              <Text style={_styles.subject}>{Strings.Syllabus.FROM + ' - ' + (syllabusDetail?.termPeriod ?? '')}</Text>
            </View>
            <View style={_styles.headerHolder}>
              <Text style={_styles.subject}>{Strings.Syllabus.SUBJECT + ' ' + (syllabusDetail?.subjects?.length ?? 0)}</Text>
              <Text style={_styles.subject}>{Strings.Syllabus.CHAPTER + ' ' + (syllabusDetail?.chapters ?? 0)}</Text>
            </View>
          </View>
        )}
        <ContentList<Subject>
          items={syllabusDetail?.subjects}
          isLoading={isLoading}
          isRetry={!!error}
          message={error ? error.error.message : Strings.Syllabus.EMPTY}
          onRetry={() => retry()}
          onRefresh={() => retry()}
          onRender={(item, index) => {
            let iconName = item.subjectCode;

            if (item.subjectName.trim().includes(' ')) {
              if (!iconName) {
                const array = item.subjectName.split(' ');
                iconName = array[0].slice(0, 1) + array[1].slice(0, 1);
              }
            } else {
              if (!iconName) {
                iconName = item.subjectName.slice(0, 2);
              }
            }

            return (
              <View style={_styles.itemHolder}>
                <View style={_styles.subjectIcon}>
                  <Text style={_styles.icon}>{iconName}</Text>
                </View>
                <View style={_styles.subjectHolder}>
                  <Text style={_styles.subjectName}>{item.subjectName}</Text>
                  <Text style={_styles.chapter}>{Strings.Syllabus.CHAPTERS + ' - ' + item.chapterName}</Text>
                </View>
                <View style={_styles.codeHolder}>
                  <Text style={_styles.code}>{iconName}</Text>
                </View>
              </View>
            );
          }}
        />
        <Modal style={_styles.bottomModalView} visible={isModalVisible}>
          <View style={_styles.modal}>
            <Text style={_styles.termTitle}>{'Terms'}</Text>
            <HorizontalDivider color={Colors.L_GRAY} />
            {syllabus &&
              syllabus.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index.toString()}
                    style={{ width: '100%', alignItems: 'center' }}
                    onPress={() => {
                      setSyllabusDetail(item);
                      setModalVisible(false);
                    }}>
                    <Text style={_styles.termName}>{item.termName}</Text>
                    <View style={{ width: '100%', paddingStart: 15, paddingEnd: 15 }}>
                      <HorizontalDivider color={Colors.L_GRAY} />
                    </View>
                  </TouchableOpacity>
                );
              })}
          </View>
        </Modal>
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
  header: {
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
    backgroundColor: Colors.WHITE,
  },
  headerHolder: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subject: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    opacity: 0.8,
  },
  arrow: {
    width: 20,
    height: 20,
    marginStart: 5,
    tintColor: Colors.PRIMARY,
    transform: [{ rotate: '270deg' }],
  },
  indicator: {
    color: Colors.WHITE,
    alignSelf: 'center',
  },
  itemContainer: {
    flexGrow: 1,
    padding: 5,
    justifyContent: 'center',
  },
  itemHolder: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  subjectIcon: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.PRIMARY,
  },
  icon: {
    minWidth: 30,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.WHITE,
    textTransform: 'uppercase',
  },
  subjectHolder: {
    flex: 1,
    marginStart: 10,
  },
  subjectName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
  chapter: {
    fontSize: 14,
    color: Colors.PRIMARY,
  },
  codeHolder: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: Colors.PRIMARY,
  },
  code: {
    fontSize: 14,
    color: Colors.WHITE,
    textTransform: 'uppercase',
  },
  bottomModalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modal: {
    width: '100%',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  termTitle: {
    fontSize: 18,
    padding: 10,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
  termName: {
    fontSize: 16,
    padding: 15,
    width: '100%',
    textAlign: 'center',
    color: Colors.PRIMARY,
  },
});
