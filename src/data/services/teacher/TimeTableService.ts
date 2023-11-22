import { AxiosResponse } from 'axios';
import { ApiEndpoints, get, getInstitute, TimeTableResponse } from '../..';
import { TeacherTimeTableResponse } from '../../model/TeacherTimeTable';

// /* ------------- Api ------------- */

export const getTeacherTimeTable = async ({ id, day }: { id: number; day: string }) => {
  console.log('here-service')
  return await getInstitute().then(institute =>
    get<AxiosResponse<TeacherTimeTableResponse>>({
      endpoint: ApiEndpoints.TEACHER_TIME_TABLE +'0/0/1/'+ id ,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};
