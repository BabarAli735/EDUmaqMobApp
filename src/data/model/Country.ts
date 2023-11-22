export type CountryResponse = Country[];

export interface Country {
  countryName: string;
  countryCode: string;
  id: number;
  branchId: number;
  status: boolean;
  createdDate: string;
  createdBy: number;
  modifiedDate: string;
  modifiedBy: number;
  isDeleted: boolean;
  deletedDate: string;
  deletedBy: number;
}
