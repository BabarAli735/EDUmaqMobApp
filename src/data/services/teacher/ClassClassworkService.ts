import { AxiosResponse } from 'axios';
import { ClassClassworkResponse, ApiEndpoints, get, getInstitute } from '../..';

// /* ------------- Api ------------- */
export const getClassClasswork = async () => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<ClassClassworkResponse>>({
      endpoint: ApiEndpoints.CLASS_CLASSWORK,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }).then(response => {
      return response;
    }),
  );
};
