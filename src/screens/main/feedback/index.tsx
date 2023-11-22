import moment from 'moment';
import React from 'react';
import { Image, Platform, StyleSheet, Text, TextInput as InputText, TouchableOpacity, View } from 'react-native';
import { FAB, Modal, TextInput } from 'react-native-paper';
import { Colors, Icons, Strings } from '../../../assets';
import { ButtonView, Container, ContentList, HeaderView, HorizontalDivider } from '../../../components';
import { FeedbackDetail } from '../../../data';
import { useFeedbacksSelector } from '../../../redux';

export function FeedbackScreen() {
  const { isLoading, feedbacks, error, onRetry, subject, setSubject, message, setMessage, isRefreshing, onRefresh, onSubmit, isModalVisible, setModalVisible } = useFeedbacksSelector();

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView title={Strings.Feedback.TITLE} isSearch isNotification />
        <ContentList<FeedbackDetail>
          items={feedbacks}
          isLoading={isLoading}
          isRetry={!!error}
          onRetry={() => onRetry()}
          onRefresh={() => onRefresh()}
          message={error ? error.error.message : Strings.Feedback.EMPTY}
          onRender={(item, index) => {
            return (
              <View style={_styles.itemHolder}>
                <Text style={_styles.date}>{moment(item.createdDate).format('DD MMM YYYY')}</Text>
                <Text style={_styles.subject}>{item.subject}</Text>
                <HorizontalDivider color={Colors.L_GRAY} />
                <Text style={_styles.message}>{item.message}</Text>
              </View>
            );
          }}
        />
        <Modal style={_styles.bottomModalView} visible={isModalVisible} onDismiss={() => setModalVisible(false)}>
          <View style={_styles.modal}>
            <TextInput
              style={_styles.paperInputStyle}
              mode={'outlined'}
              theme={{ colors: { placeholder: Colors.PRIMARY } }}
              label={Strings.Feedback.SUBJECT}
              value={Strings.Feedback.SUBJECT}
              outlineColor={Colors.PRIMARY}
              multiline
              render={props => <InputText value={subject ?? ''} style={_styles.inputStyle} placeholder={Strings.Feedback.SUBJECT} placeholderTextColor={Colors.GRAY} multiline onChangeText={text => setSubject(text)} />}
            />
            <TextInput
              style={_styles.paperInputStyle}
              mode={'outlined'}
              theme={{ colors: { placeholder: Colors.PRIMARY } }}
              label={Strings.Feedback.MESSAGE}
              value={Strings.Feedback.MESSAGE}
              outlineColor={Colors.PRIMARY}
              multiline
              render={props => <InputText value={message ?? ''} style={_styles.inputStyle} placeholder={Strings.Feedback.MESSAGE} placeholderTextColor={Colors.GRAY} multiline onChangeText={text => setMessage(text)} />}
            />
            <ButtonView
              title={Strings.Feedback.BUTTON}
              style={{ marginTop: 30, width: '100%' }}
              isLoading={isLoading && !isRefreshing}
              onPress={() => {
                !isLoading && onSubmit();
              }}
            />
            <TouchableOpacity style={{ alignSelf: 'center', padding: 10, marginTop: 10 }} onPress={() => setModalVisible(false)}>
              <Text style={{ color: Colors.ACCENT }}>{'Close'}</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        {!isModalVisible && <FAB style={_styles.fabButton} icon={() => <Image source={Icons.IC_PLUS} style={_styles.fabIcon} />} onPress={() => setModalVisible(true)} />}
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
  itemHolder: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
  },
  date: {
    fontSize: 16,
    marginBottom: 10,
    color: Colors.PRIMARY,
  },
  subject: {
    fontSize: 16,
    marginBottom: 10,
    color: Colors.PRIMARY,
  },
  message: {
    fontSize: 16,
    marginTop: 10,
    color: Colors.GRAY,
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
  paperInputStyle: {
    borderRadius: 4,
    marginTop: 10,
    width: '100%',
    backgroundColor: Colors.WHITE,
  },
  inputStyle: {
    fontSize: 16,
    padding: 10,
    color: Colors.PRIMARY,
    ...Platform.select({
      android: {
        textAlignVertical: 'center',
      },
    }),
  },
  bottomModalView: {
    width: '100%',
    justifyContent: 'flex-end',
    margin: 0,
  },
  modal: {
    width: '100%',
    padding: 15,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
