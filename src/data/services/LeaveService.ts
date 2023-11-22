import { AxiosResponse } from 'axios';
import { ApiEndpoints, get, getInstitute, LeaveDetail, LeaveRequestParams, LeavesResponse, post } from '..';

/* ------------- Api ------------- */
export const getLeaveRequests = async ({ id }: { id?: number }) => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<LeavesResponse>>({
      endpoint: ApiEndpoints.LEAVES + id,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};

export const postLeaveRequest = async (params: LeaveRequestParams) => {
  return await getInstitute().then(institute =>
    post<AxiosResponse<LeaveDetail>>({
      endpoint: ApiEndpoints.LEAVE_REQUEST,
      data: params,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};
