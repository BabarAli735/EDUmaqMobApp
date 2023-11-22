import moment from 'moment';
import React from 'react';
import { Image, TextInput as InputText, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TextInput } from 'react-native-paper';
import { Colors, Icons, Strings } from '../../../../assets';
import { ButtonView, Container, ContentList, HeaderView } from '../../../../components';
import Bottomsheet from '../../../../components/bottomsheet';
import { LeaveDetail, LeaveStatus } from '../../../../data';
import { useLeaveRequestSelector, useLeaveSelector, useMainNavigator } from '../../../../redux';
import { format } from '../../../../utils';

export function LeaveScreen() {
  const { navigation } = useMainNavigator();
  const leave = useLeaveSelector();
  const leaveRequest = useLeaveRequestSelector();

  const [isModalVisible, setModalVisible] = React.useState<boolean>(false);
  const [isFromDatePicker, setFromDatePicker] = React.useState<boolean>(false);
  const [isDatePickerVisible, setDatePickerVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    setModalVisible(false);
  }, [leave.leave]);

  const onPressPicker = (isFromPicker: boolean) => {
    setFromDatePicker(isFromPicker);
    setDatePickerVisible(true);
  };

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView title={Strings.Leaves.TITLE} isSearch isNotification />
        <View style={_styles.heading}>
          <TouchableOpacity style={{ ..._styles.headingItem, backgroundColor: leave.status === LeaveStatus.TOTAL ? Colors.CYAN : Colors.TRANSPARENT, flex: 0.8 }} onPress={() => leave.filter(LeaveStatus.TOTAL)}>
            <Text style={{ ..._styles.headerLabel, opacity: leave.status === LeaveStatus.TOTAL ? 1 : 0.7 }}>{Strings.Leaves.TOTAL + ':' + leave.count.total}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ..._styles.headingItem, backgroundColor: leave.status === LeaveStatus.PENDING ? Colors.CYAN : Colors.TRANSPARENT, flex: 0.9 }} onPress={() => leave.filter(LeaveStatus.PENDING)}>
            <Text style={{ ..._styles.headerLabel, opacity: leave.status === LeaveStatus.PENDING ? 1 : 0.7 }}>{Strings.Leaves.PENDING + ':' + leave.count.pending}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ..._styles.headingItem, backgroundColor: leave.status === LeaveStatus.APPROVED ? Colors.CYAN : Colors.TRANSPARENT }} onPress={() => leave.filter(LeaveStatus.APPROVED)}>
            <Text style={{ ..._styles.headerLabel, opacity: leave.status === LeaveStatus.APPROVED ? 1 : 0.7 }}>{Strings.Leaves.APPROVED + ':' + leave.count.approved}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ..._styles.headingItem, marginEnd: 0, backgroundColor: leave.status === LeaveStatus.REJECTED ? Colors.CYAN : Colors.TRANSPARENT }} onPress={() => leave.filter(LeaveStatus.REJECTED)}>
            <Text style={{ ..._styles.headerLabel, opacity: leave.status === LeaveStatus.REJECTED ? 1 : 0.7 }}>{Strings.Leaves.REJECTED + ':' + leave.count.rejected}</Text>
          </TouchableOpacity>
        </View>

        <ContentList<LeaveDetail>
          items={leave.leave}
          isLoading={leave.isLoading}
          isRetry={!!leave.error}
          onRetry={() => leave.onRetry()}
          onRefresh={() => leave.onRefresh()}
          message={leave.error ? leave.error.error.message : Strings.Leaves.EMPTY.replace('#TAG#', leave.status.toLowerCase())}
          onRender={(item, index) => {
            return (
              <View key={index} style={_styles.heading}>
                <View style={_styles.dateItemHolder}>
                  <View style={{ ..._styles.dateHolder, borderBottomWidth: 1, borderBottomColor: Colors.GRAY, paddingBottom: 5 }}>
                    <Text style={_styles.label}>{Strings.Leaves.DATE}</Text>
                    <Text style={_styles.date}>{':' + format(new Date(item.createdDate), 'DD MMM')}</Text>
                  </View>
                  <View style={_styles.dateHolder}>
                    <Text style={_styles.label}>{Strings.Leaves.FROM}</Text>
                    <Text style={_styles.date}>{':' + format(new Date(item.fromDate), 'DD MMM')}</Text>
                  </View>
                  <View style={_styles.dateHolder}>
                    <Text style={_styles.label}>{Strings.Leaves.TO}</Text>
                    <Text style={_styles.date}>{':' + format(new Date(item.toDate), 'DD MMM')}</Text>
                  </View>
                </View>
                <Text numberOfLines={3} style={_styles.description}>
                  {item.reason}
                </Text>
                <View style={{ ..._styles.statusHolder, backgroundColor: item.leaveStatus === LeaveStatus.APPROVED ? Colors.PRESENT : Colors.ABSENT }}>
                  <Text style={_styles.status}>{item.leaveStatus ?? LeaveStatus.PENDING}</Text>
                </View>
              </View>
            );
          }}
        />

        {!isModalVisible && (
          <TouchableOpacity style={_styles.fabButton} activeOpacity={0.7} onPress={() => setModalVisible(true)}>
            <Image source={Icons.IC_PLUS} style={_styles.fabIcon} />
          </TouchableOpacity>
        )}

        <Bottomsheet isVisible={isModalVisible} onClose={() => setModalVisible(false)}>
          <View style={_styles.modal}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity activeOpacity={1} style={{ flex: 1, marginEnd: 10 }} onPress={() => onPressPicker(true)}>
                <TextInput
                  style={_styles.paperInputStyle}
                  mode={'outlined'}
                  theme={{ colors: { placeholder: Colors.PRIMARY } }}
                  label={Strings.Leaves.FROM}
                  value={Strings.Leaves.FROM}
                  outlineColor={Colors.PRIMARY}
                  render={props => <InputText editable={false} onPressOut={() => onPressPicker(true)} value={leaveRequest.fromDate} style={_styles.inputStyle} placeholder={Strings.Leaves.SELECT} placeholderTextColor={Colors.GRAY} />}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} style={{ flex: 1, marginEnd: 10 }} onPress={() => onPressPicker(false)}>
                <TextInput
                  style={{ ..._styles.paperInputStyle, flex: 1 }}
                  mode={'outlined'}
                  theme={{ colors: { placeholder: Colors.PRIMARY } }}
                  label={Strings.Leaves.TO}
                  value={Strings.Leaves.TO}
                  outlineColor={Colors.PRIMARY}
                  render={props => <InputText editable={false} onPressOut={() => onPressPicker(false)} value={leaveRequest.toDate} style={_styles.inputStyle} placeholder={Strings.Leaves.SELECT} placeholderTextColor={Colors.GRAY} />}
                />
              </TouchableOpacity>
              <TextInput
                style={{ ..._styles.paperInputStyle, flex: 1 }}
                mode={'outlined'}
                theme={{ colors: { placeholder: Colors.PRIMARY } }}
                label={Strings.Leaves.DURATION}
                value={Strings.Leaves.DURATION}
                outlineColor={Colors.PRIMARY}
                render={props => <InputText editable={false} onPressOut={() => onPressPicker(false)} value={leaveRequest.duration ? leaveRequest.duration : ''} style={_styles.inputStyle} placeholder={'0'} placeholderTextColor={Colors.GRAY} />}
              />
            </View>
            <TextInput
              style={_styles.paperInputStyleReason}
              mode={'outlined'}
              theme={{ colors: { placeholder: Colors.PRIMARY } }}
              label={Strings.Leaves.REASON}
              value={Strings.Leaves.REASON}
              outlineColor={Colors.PRIMARY}
              multiline
              render={props => (
                <InputText value={leaveRequest.reason ? leaveRequest.reason : ''} style={_styles.inputStyleReason} placeholder={Strings.Leaves.REASON} placeholderTextColor={Colors.GRAY} multiline onChangeText={text => leaveRequest.setReason(text)} />
              )}
            />
            <ButtonView
              title={Strings.Leaves.BUTTON}
              style={{ marginTop: 30, width: '100%' }}
              isLoading={leaveRequest.isLoading}
              onPress={() => {
                leaveRequest.apply();
              }}
            />
            <TouchableOpacity style={{ alignSelf: 'center', padding: 10, marginTop: 10 }} onPress={() => setModalVisible(false)}>
              <Text style={{ color: Colors.ACCENT }}>{'Close'}</Text>
            </TouchableOpacity>
          </View>
        </Bottomsheet>

        {/* Date Picker */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          // date={isFromDatePicker ? leaveRequest.fromDate :  leaveRequest.toDate  }
          onConfirm={date => {
            if (isFromDatePicker) {
              date && leaveRequest.setFromDate(moment(date).format('DD-MM-YYYY'));
            } else {
              date && leaveRequest.setToDate(moment(date).format('DD-MM-YYYY'));
            }
            setDatePickerVisible(false);
          }}
          onCancel={() => setDatePickerVisible(false)}
        />
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
  heading: {
    margin: 3,
    padding: 3,
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    alignItems: 'flex-end',
  },
  headingItem: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    marginEnd: 3,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: Colors.CYAN,
  },
  headerLabel: {
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    textAlign: 'center',
  },
  dateItemHolder: {
    paddingTop: 5,
    paddingBottom: 5,
    marginEnd: 3,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: Colors.CYAN,
  },
  dateHolder: {
    flexDirection: 'row',
    marginBottom: 5,
    marginStart: 5,
    marginEnd: 5,
    minWidth: 60,
    justifyContent: 'space-between',
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: Colors.PRIMARY,
  },
  date: {
    flex: 1,
    fontSize: 16,
    color: Colors.PRIMARY,
  },
  description: {
    flex: 1,
    fontSize: 16,
    paddingStart: 5,
    paddingEnd: 5,
    paddingBottom: 5,
    textAlign: 'justify',
    color: Colors.PRIMARY,
  },
  statusHolder: {
    top: 0,
    end: 0,
    paddingTop: 3,
    paddingEnd: 5,
    paddingStart: 5,
    paddingBottom: 3,
    borderRadius: 5,
    position: 'absolute',
  },
  status: {
    fontSize: 16,
    color: Colors.WHITE,
  },
  fabButton: {
    position: 'absolute',
    padding: 16,
    right: 16,
    bottom: 16,
    borderRadius: 999,
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
  input: {
    height: 40,
    backgroundColor: Colors.WHITE,
  },
  attachment: {
    fontSize: 16,
    color: Colors.PRIMARY,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.ACCENT,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.WHITE,
  },
  attachmentIcon: {
    width: 20,
    height: 20,
    marginStart: 5,
    tintColor: Colors.PRIMARY,
  },
  paperInputStyle: {
    height: 50,
    borderRadius: 4,
    backgroundColor: Colors.WHITE,
  },
  inputStyle: {
    fontSize: 16,
    padding: 10,
    color: Colors.PRIMARY,
  },
  paperInputStyleReason: {
    height: 100,
    width: '100%',
    borderRadius: 4,
    marginTop: 10,
    backgroundColor: Colors.WHITE,
  },
  inputStyleReason: {
    fontSize: 16,
    padding: 10,
    height: 100,
    color: Colors.PRIMARY,
    ...Platform.select({
      android: {
        textAlignVertical: 'top',
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
