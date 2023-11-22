import { AxiosResponse } from 'axios';
import { AnnouncementResponse, ApiEndpoints, get, getInstitute } from '..';

// /* ------------- Api ------------- */
export const getAnnouncements = async ({ id, role }: { id?: number; role: string }) => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<AnnouncementResponse>>({
      endpoint: ApiEndpoints.ANNOUNCEMENTS + 20 + '/' + role,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }).then(response => {
      return response;
    }),
  );
};
