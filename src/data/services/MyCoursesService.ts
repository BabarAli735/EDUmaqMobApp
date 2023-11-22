import { AxiosResponse } from 'axios';
import { ApiEndpoints, MyCoursesResponse, get, getInstitute } from '..';

// /* ------------- Api ------------- */
export const getMyCourses = async ({ classId, batchId }: { classId?: number; batchId?: number }) => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<MyCoursesResponse>>({
      endpoint: ApiEndpoints.MY_COURSES + '?classId=' + classId + '&batchId=' + batchId,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};
