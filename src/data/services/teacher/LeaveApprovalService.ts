import { AxiosResponse } from 'axios';
import { ApiEndpoints, get, getInstitute, put,} from '../..';
import { TeacherTimeTableResponse } from '../../model/TeacherTimeTable';

// /* ------------- Api ------------- */

export const getLeaveApproval = async ({ classId, batchId }: { classId: number; batchId: number }) => {
  console.log('here-service')
  return await getInstitute().then(institute =>
    get<AxiosResponse<TeacherTimeTableResponse>>({
      endpoint: ApiEndpoints.TEACHER_LEAVE_APPROVAL +'classId='+classId+'&batchId='+batchId,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );

  
};
export const putAcceptReject = async (params: any) => {
  const {id}={...params}
  console.log('id:,',id)
  return await getInstitute().then(institute =>
    put<AxiosResponse<any>>({
      endpoint: ApiEndpoints.TEACHER_LEAVE_ACCEPT_REJECT+'/'+id,
      data: params,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};
