import { ApiEndpoints, post } from '..';

/* ------------- Types ------------- */
export interface HomeResponse {
  status: number;
  message: string;
  auth_token: string;
  data: any;
}

// /* ------------- Api ------------- */
// export const getDashboard = (companyId: number) =>
//   post<HomeResponse>(ApiEndpoints.HOME, null, {
//     body: { company_id: companyId },
//   });
