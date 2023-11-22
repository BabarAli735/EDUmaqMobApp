import React from 'react';
import { useSelector } from 'react-redux';
import { useAuthenticationSelector } from '..';
import { RootState } from '../RootTypes';
import StoreService from '../StoreService';
import { Announcement, AnnouncementStatus } from './../../data';
import { announcementsRequest } from './../actions';

const announcementStateSelector = (state: RootState) => state.announcement;

export const useAnnouncementSelector = () => {
  const [status, setStatus] = React.useState<AnnouncementStatus>(AnnouncementStatus.TOTAL);
  const [announcements, setAnnouncements] = React.useState<Announcement[]>();
  const { profile } = useAuthenticationSelector();

  const { isLoading, announcement, error } = useSelector(announcementStateSelector);
  const [count, setCount] = React.useState({ total: 0, seen: 0, unseen: 0 });

  React.useEffect(() => {
    if (announcement && announcement.events && announcement.events.length > 0) {
      let abc=announcement.events
      abc.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

      setAnnouncements(abc);
      setCount({
        total: announcement.events.length,
        seen: announcement.events.filter(item => item.isSeen == true).length,
        unseen: announcement.events.filter(item => item.isSeen == false).length,
      });
    }
  }, [announcement]);

  React.useEffect(() => {
    StoreService.dispatch(announcementsRequest({ id: profile?.id ?? 0, role: profile?.userType ?? 'Student' }));
  }, []);

  const filter = (status: AnnouncementStatus) => {
    setStatus(status);
    if (announcement && announcement.events && announcement.events.length > 0) {
      if (status == AnnouncementStatus.SEEN) {
        const items = announcement?.events.filter(item => item.isSeen == true);
        setAnnouncements(items);
      } else if (status == AnnouncementStatus.UNSEEN) {
        const items = announcement?.events.filter(item => item.isSeen == false);
        setAnnouncements(items);
      } else {
        setAnnouncements(announcement.events);
      }
    }
  };

  const retry = () => {
    StoreService.dispatch(announcementsRequest({ id: profile?.id ?? 0, role: profile?.userType ?? 'Student' }));
  };

  return { status, filter, isLoading, announcements, error, retry, count };
};
