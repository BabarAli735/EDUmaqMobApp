export type CityResponse = City[];

export interface City {
  id: number;
  cityName: string;
  stateId: string;
  status: string;
  stateName: string;
  isDeleted: any;
}
