import { AxiosResponse } from 'axios';
import { ApiEndpoints, get, getInstitute, SyllabusResponse } from '..';

// /* ------------- Api ------------- */
export const getSyllabus = async ({ id }: { id?: number }) => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<SyllabusResponse>>({
      endpoint: ApiEndpoints.SYLLABUS + id,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};
