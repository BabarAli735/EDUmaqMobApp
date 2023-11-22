export type StateResponse = State[];

export interface State {
  id: number;
  countryId: string;
  stateName: string;
  countryName: string;
  status: string;
  isDeleted: any;
}
