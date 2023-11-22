import { AxiosResponse } from 'axios';
import { ApiEndpoints, CityResponse, CountryResponse, get, StateResponse } from '..';

// /* ------------- Api ------------- */
export const getCountries = async () => {
  return await get<AxiosResponse<CountryResponse>>({ endpoint: ApiEndpoints.MASTER_COUNTRY });
};

export const getStates = async () => {
  return await get<AxiosResponse<StateResponse>>({ endpoint: ApiEndpoints.MASTER_STATE });
};

export const getCities = async () => {
  return await get<AxiosResponse<CityResponse>>({ endpoint: ApiEndpoints.MASTER_CITY });
};
