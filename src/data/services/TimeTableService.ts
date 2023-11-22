import { AxiosResponse } from 'axios';
import { ApiEndpoints, get, getInstitute, TimeTableResponse } from '..';

// /* ------------- Api ------------- */
export const getTimeTable = async ({ id, day }: { id: number; day: string }) => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<TimeTableResponse>>({
      endpoint: ApiEndpoints.TIME_TABLE + id + '/' + day,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};
