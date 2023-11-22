import { AxiosResponse } from 'axios';
import { ApiEndpoints, AttendanceTeacherResponse, get, getInstitute } from '..';

// /* ------------- Api ------------- */
export const getTeacherAttendance = async ({ id, date }: { id?: number; date?: string }) => {
  console.log('here-service')
  return await getInstitute().then(institute =>
    get<AxiosResponse<AttendanceTeacherResponse>>({
      endpoint: ApiEndpoints.ATTENDANCE_TEACHER + date + '/'+id,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};
