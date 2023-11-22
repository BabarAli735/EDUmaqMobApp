import { AxiosResponse } from 'axios';
import { ApiEndpoints, AttendanceResponse, get, getInstitute } from '..';

// /* ------------- Api ------------- */
export const getAttendance = async ({ id, date }: { id?: number; date?: string }) => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<AttendanceResponse>>({
      endpoint: ApiEndpoints.ATTENDANCE + date + '/'+id,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};
