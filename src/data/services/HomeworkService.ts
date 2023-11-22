import { AxiosResponse } from "axios";
import { ApiEndpoints, get, getInstitute, HomeworkResponse } from "..";


/* ------------- Api ------------- */
export const getHomeworks = async ({ id }: { id?: number }) => {
    return await getInstitute().then(institute =>
      get<AxiosResponse<HomeworkResponse>>({
        endpoint: ApiEndpoints.HOMEWORKS + id,
        headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
      }),
    );
  };