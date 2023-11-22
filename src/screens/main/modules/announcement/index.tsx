import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Strings } from '../../../../assets';
import { Container, ContentList, DateHeaderView, HeaderView, HorizontalDivider } from '../../../../components';
import { Announcement, AnnouncementStatus } from '../../../../data';
import { useAnnouncementSelector } from '../../../../redux';

export function AnnouncementsScreen() {
  const announcement = useAnnouncementSelector();

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView title={Strings.Announcement.TITLE} isSearch isNotification />
        <HorizontalDivider width={3} />
        {/*<DateHeaderView />*/}
        <View style={_styles.heading}>
          <TouchableOpacity style={{ ..._styles.headingItem, backgroundColor: announcement.status === AnnouncementStatus.TOTAL ? Colors.CYAN : Colors.TRANSPARENT }} onPress={() => announcement.filter(AnnouncementStatus.TOTAL)}>
            <Text style={{ ..._styles.headerLabel, opacity: announcement.status === AnnouncementStatus.TOTAL ? 1 : 0.7 }}>{AnnouncementStatus.TOTAL + ' : ' + announcement.count.total}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ..._styles.headingItem, backgroundColor: announcement.status === AnnouncementStatus.SEEN ? Colors.CYAN : Colors.TRANSPARENT }} onPress={() => announcement.filter(AnnouncementStatus.SEEN)}>
            <Text style={{ ..._styles.headerLabel, opacity: announcement.status === AnnouncementStatus.SEEN ? 1 : 0.7 }}>{AnnouncementStatus.SEEN + ' : ' + announcement.count.seen}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ..._styles.headingItem, backgroundColor: announcement.status === AnnouncementStatus.UNSEEN ? Colors.CYAN : Colors.TRANSPARENT }} onPress={() => announcement.filter(AnnouncementStatus.UNSEEN)}>
            <Text style={{ ..._styles.headerLabel, opacity: announcement.status === AnnouncementStatus.UNSEEN ? 1 : 0.7 }}>{AnnouncementStatus.UNSEEN + ' : ' + announcement.count.unseen}</Text>
          </TouchableOpacity>
        </View>
        {}
        <ContentList<Announcement>
          items={announcement.announcements}
          isLoading={announcement.isLoading}
          isRetry={!!announcement.error}
          message={announcement.error ? announcement.error.error.message : Strings.Announcement.EMPTY}
          onRetry={() => announcement.retry()}
          onRefresh={() => announcement.retry()}
          onRender={(item, index) => {
            return (
              <View style={_styles.eventHolder}>
                <View style={_styles.eventIconHolder}>
                  <Text style={_styles.eventIconDate}>{moment(new Date(item.startDate)).format('DD')}</Text>
                  <Text style={_styles.eventIconMonth}>{moment(new Date(item.startDate)).format('MMM')}</Text>
                </View>
                <View style={_styles.eventLabelHolder}>
                  <Text style={_styles.eventLabelTitle}>{item.eventName}</Text>
                  <Text style={_styles.eventLabelType}>{item.eventType === 'Holiday' ? item.eventType : 'Event'}</Text>
                </View>
              </View>
            );
          }}
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
  eventHolder: {
    flexDirection: 'row',
    padding: 5,
  },
  eventIconHolder: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    backgroundColor: Colors.HOLIDAY,
  },
  eventIconDate: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    fontSize: 30,
  },
  eventIconMonth: {
    color: Colors.WHITE,
    fontWeight: 'bold',
  },
  eventLabelHolder: {
    flex: 1,
    paddingStart: 10,
    paddingEnd: 10,
    marginStart: 10,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
  },
  eventLabelTitle: {
    color: Colors.PRIMARY,
    fontWeight: 'bold',
    fontSize: 25,
  },
  eventLabelType: {
    color: Colors.PRIMARY,
    fontSize: 16,
  },
});
