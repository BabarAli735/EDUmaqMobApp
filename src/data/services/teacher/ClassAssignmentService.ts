import { AxiosResponse } from 'axios';
import { ClassAssignmentResponse, ApiEndpoints, get, getInstitute } from '../..';

// /* ------------- Api ------------- */
export const getClassAssignment = async () => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<ClassAssignmentResponse>>({
      endpoint: ApiEndpoints.CLASS_ASSIGNMENT,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }).then(response => {
      return response;
    }),
  );
};
