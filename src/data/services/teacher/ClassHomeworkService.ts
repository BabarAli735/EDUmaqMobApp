import { AxiosResponse } from 'axios';
import { ClassHomeworkResponse, ApiEndpoints, get, getInstitute } from '../..';

// /* ------------- Api ------------- */
export const getClassHomework = async () => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<ClassHomeworkResponse>>({
      endpoint: ApiEndpoints.CLASS_HOMEWORK,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }).then(response => {
      return response;
    }),
  );
};
