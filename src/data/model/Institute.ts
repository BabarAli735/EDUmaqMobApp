export interface InstituteVerifyResponse {
  isVerified: boolean;
  detail: InstituteDetail;
}

export interface InstituteDetail {
  id: number;
  addressLocation: string;
  affiliationId: string;
  affiliationType: string;
  city: string;
  contactNumber: string;
  country: string;
  countryCode: any;
  currencySymbol: string;
  emailId: string;
  institutionCode: string | any;
  institutionname?: string;
  institutionName?: string;
  landLine: string;
  logoUrl: string;
  medium: string;
  state: string;
  timeZone: any;
  websiteURL: string;
  weekendStartDay: string;
  countryID: number;
  stateId: number;
  cityId: number;
  telephone: string;
  weekStartDay: any;
  institutionLogo: string;
  address: string;
  branchCount: number;
  studentCount: number;
  createdDate: string;
  createdBy: number;
  branchId: number;
  modifiedBy: number;
  modifiedDate: string;
  status: boolean;
  userType: any;
}

export interface InstituteRegisterResponse {}
