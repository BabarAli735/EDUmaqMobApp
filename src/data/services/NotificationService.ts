import { AxiosResponse } from 'axios';
import { ApiEndpoints, get, getInstitute, NotificationResponse } from '..';

// /* ------------- Api ------------- */
export const getNotifications = async () => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<NotificationResponse>>({
      endpoint: ApiEndpoints.NOTIFICATIONS,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};
