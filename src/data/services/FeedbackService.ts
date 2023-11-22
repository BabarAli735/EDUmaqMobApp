import { AxiosResponse } from 'axios';
import { ApiEndpoints, FeedbackRequestParams, FeedbackResponse, get, getInstitute, post } from '..';

/* ------------- Api ------------- */
export const getFeedbacks = async ({ id }: { id?: number }) => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<FeedbackResponse>>({
      endpoint: ApiEndpoints.FEEDBACKS + id,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};

export const postFeedbackRequest = async (body: FeedbackRequestParams) => {
  return await getInstitute().then(institute =>
    post({
      endpoint: ApiEndpoints.FEEDBACK,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
      data: body,
    }),
  );
};
