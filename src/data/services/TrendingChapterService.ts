import { AxiosResponse } from 'axios';
import { ApiEndpoints, TrendingChapterResponse, get, getInstitute } from '..';

// /* ------------- Api ------------- */
export const getTrendingChapter = async ({ classId, batchId }: { classId?: number; batchId?: number }) => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<TrendingChapterResponse>>({
      endpoint: ApiEndpoints.TRENDING_CHAPTERS + '?classId=' + classId + '&batchId=' + batchId,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};
