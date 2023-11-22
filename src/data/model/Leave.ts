export type LeavesResponse = LeaveDetail[];

export interface LeaveDetail {
  batchId: number;
  classId: number;
  admissionId: number;
  fromDate: string;
  toDate: string;
  requiredDays: string;
  reason: string;
  source: string;
  remarks: any;
  approvedBy: any;
  leaveStatus: LeaveStatus;
  leaveFile: any;
  class: ClassDetail;
  batch: BatchDetail;
  admission: AdmissionDetail;
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

export interface ClassDetail {
  classCourseName: string;
  classCode: string;
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

export interface BatchDetail {
  batchName: string;
  classId: number;
  streamId: number;
  seatingCapacity: string;
  class: any;
  stream: any;
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

export interface AdmissionDetail {
  admissionNo: string;
  admissionNoCounter: number;
  registrationNo: string;
  admissionDate: string;
  studentName: string;
  rollNo: string;
  studentAdmissionType: any;
  academicYearId: number;
  classCourseId: number;
  previousClassCourseId: number;
  batchId: number;
  streamId: number;
  dob: string;
  age: number;
  gender: number;
  studentImage: string;
  imageUrl: string;
  nationalityId: number;
  religionId: number;
  categoryId: number;
  casteId: number;
  motherTounge: string;
  bloodGroup: string;
  smsMobNumber: string;
  whatsAppNo: string;
  emailId: string;
  adharNumber: string;
  houseName: string;
  disability: boolean;
  lastSchool: string;
  yearOfPassing: string;
  tcNumber: string;
  accountHolder: string;
  accountNo: string;
  ifscCode: string;
  spclInterest: string;
  medicalHis: string;
  allergicTo: string;
  medicineAny: string;
  localStateId: number;
  localCityId: number;
  localPINCode: string;
  localContactNo: string;
  localFullAddress: string;
  copyAddressStatus: boolean;
  permenantStateId: number;
  permenantCityId: number;
  permenantPINCode: string;
  permenantContactNo: string;
  permenantFullAddress: string;
  fatherName: string;
  fatherQualification: string;
  fatherMobileNo: string;
  fatherEmailId: string;
  fatherAdhaarNumber: string;
  fatherJobDetails: string;
  fatherDesignation: string;
  fatherOrganization: string;
  fatherAnnualIncome: string;
  fatherPhotograph: string;
  motherFullName: string;
  motherQualification: string;
  motherMobileNumber: string;
  motherEmailId: string;
  motherAdhaarNumber: string;
  motherJobDetails: string;
  motherDesignation: string;
  motherOrganization: string;
  motherAnnualIncome: string;
  motherPhotograph: string;
  loginStatus: boolean;
  loginId: string;
  password: string;
  biometricCode: string;
  transportService: boolean;
  hostelService: boolean;
  libraryService: boolean;
  messService: boolean;
  isBlockFromLibrary: boolean;
  studentClass: any;
  previousClassName: any;
  className: any;
  batchName: any;
  academicYearName: any;
  class: any;
  academicYear: any;
  nationality: any;
  religion: any;
  category: any;
  caste: any;
  country: any;
  localState: any;
  permanentState: any;
  localCity: any;
  permanentCity: any;
  batch: any;
  stream: any;
  studentSiblings: any;
  documentLists: any;
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

export enum LeaveStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  TOTAL = 'Total',
}

export interface LeaveRequestParams {
  admissionId?: number;
  fromDate?: string;
  toDate?: string;
  requiredDays?: string;
  reason?: string;
  source?: string;
}
