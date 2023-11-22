export interface LoginResponse {
  isLoginedSuccess: boolean;
  token?: string;
  user?: Profile | TeacherProfile;
}

export interface Profile {
  id: number;
  admissionNo: string;
  rollNo: string;
  dob: string;
  fatherName: string;
  fatherMobileNo: string;
  motherFullName: string;
  motherMobileNumber: string;
  bloodGroup: string;
  permenantFullAddress: string;
  studentImage: string;
  imageUrl: string;
  userName: string;
  classCourseName: string;
  batchName: string;
  userType: string;
  admissionId: number;
  studentName: string;
  className: string;
  siblingOfId: number;
  branchId: number;
  status: false;
  createdDate: string;
  createdBy: number;
  modifiedDate: string;
  modifiedBy: number;
  batchId: number;
  classId: number;
  isDeleted: false;
  deletedDate: string;
  deletedBy: number;
}
export interface TeacherProfile {
  bloodGroup:string,
  dateOfBirth: string,
  employeeId: string,
  employeeImage:string,
  fatherName: string,
  id: string,
  imageURI: string,
  motherName: string,
  permanentAddress:string,
  userName: string,
  userType: string,
  batchId: number;
  classId: number;
}

export type SiblingResponse = Profile[];
