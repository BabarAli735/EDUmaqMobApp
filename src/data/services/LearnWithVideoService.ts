import { AxiosResponse } from 'axios';
import { ApiEndpoints, LearnWithVideoResponse, get, getInstitute } from '..';

// /* ------------- Api ------------- */
export const getLearnWithVideo = async ({ classId }: { classId?: number }) => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<LearnWithVideoResponse>>({
      endpoint: ApiEndpoints.LEARN_WITH_VIDEO + '?ID=' + classId,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};
