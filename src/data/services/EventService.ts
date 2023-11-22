import { AxiosResponse } from 'axios';
import { ApiEndpoints, EventResponse, get, getInstitute } from '..';

// /* ------------- Api ------------- */
export const getEvents = async () => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<EventResponse>>({
      endpoint: ApiEndpoints.EVENTS,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};
