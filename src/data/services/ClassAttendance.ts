import { AxiosResponse } from 'axios';
import { ApiEndpoints, get, getInstitute, post, SyllabusResponse } from '..';
import { MarksEntryPostReqParam } from '../model/MarksEntry';
import { ClassAttendnaceParams } from '../model/ClassAttendance';

// /* ------------- Api ------------- */
export const getClassAttendance = async ({batchId,classId}:{batchId:number|string,classId:string|number}) => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<[]>>({
      endpoint: ApiEndpoints.CLASS_ATTENDANCE+`?batchId=${batchId}&&classId=${classId}`,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};


export const submitClassAttendance = async (params:ClassAttendnaceParams) => {
    return await getInstitute().then(institute =>
      post<AxiosResponse<[]>>({
        endpoint: ApiEndpoints.POST_CLASS_ATTENDANCE,
       data:params,
        headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
      }),
    );
  };