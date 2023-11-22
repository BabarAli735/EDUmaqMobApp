import { AxiosResponse } from 'axios';
import { ApiEndpoints, BaseResponse, get, getInstitute, InstituteDetail, InstituteVerifyResponse, LoginResponse, post, Profile, SendOTPResponse, SiblingResponse, TeacherProfile } from '..';

/* ------------- Types ------------- */
export interface LoginRequest {
  email: string;
  password: string;
}
export interface InstituteRequest {
  InstitutionName?: string;
  CountryId?: number;
  StateId?: number;
  CityId?: number;
  CityName?: string;
  Pincode?: string;
  Enquire?: string;
  ContactNumber?: string;
  Email?: string;
  Medium?: string;
  InstitutionType?: string;
  AffiliationType?: string;
  Remarks?: string;
}

// /* ------------- Api ------------- */
export const verifyInstitute = ({ code }: { code: string }) => {
  return get<AxiosResponse<InstituteVerifyResponse>>({ endpoint: ApiEndpoints.VERIFY_INSTITUTE + code });
};

export const sendOTP = async ({ mobile }: { mobile: string }) => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<any>>({
      endpoint: ApiEndpoints.SEND_OTP + mobile,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};

// export const verifyOTP = ({ code }: { code: string }) => {
//   return get<AxiosResponse<SendOTPResponse>>({ endpoint: ApiEndpoints.VERIFY_OTP + code });
// };

export const registerInstitute = async (params: InstituteRequest) => {
  return await post<AxiosResponse<any>>({ endpoint: ApiEndpoints.REGISTER_INSTITUTE, data: params });
};

export const verifyOTP = async ({ code }: { code: string }) => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<any>>({
      endpoint: ApiEndpoints.VERIFY_OTP + code,
      headers: { InstitutionCode: '00100' },
    }),
  );
};

export const loginMobile = async ({ mobile }: { mobile: string }) => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<LoginResponse>>({
      endpoint: ApiEndpoints.LOGIN_MOBILE + mobile,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};

export const login = async (params: LoginRequest) => {
return(params.email.startsWith('EMP')? await loginTeacher(params):loginStudent(params))
};
export const loginStudent = async (params: LoginRequest) => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<LoginResponse>>({
      endpoint: ApiEndpoints.LOGIN + '?username=' + params.email + '&password=' + params.password,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};
export const loginTeacher = async (params: LoginRequest) => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<LoginResponse>>({
      endpoint: ApiEndpoints.LOGIN_TEACHER +'/'+ params.email + '/' + params.password,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};



export const getSiblings = async ({ id }: { id: number }) => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<SiblingResponse>>({
      endpoint: ApiEndpoints.SWITCH_SIBLING + id,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};



export const replaceSiblings = async ({ id }: { id: number }) => {
  try{
  return await getInstitute().then(institute =>
    get<AxiosResponse<SiblingResponse>>({
      endpoint: ApiEndpoints.SWITCH_SIBLING + id,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
  }catch(e){
    console.log(e)
  }
};

export const getSchoolProfile = async () => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<InstituteDetail>>({
      endpoint: ApiEndpoints.INSTITUTEPROFILE,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};

export const getStudentProfile = async ({ id }: { id: number }) => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<Profile>>({
      endpoint: ApiEndpoints.STUDENT_PROFILE + id,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};

export const getTeacherProfile = async ({ id }: { id: number }) => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<TeacherProfile>>({
      endpoint: ApiEndpoints.TEACHER_PROFILE + id,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};

export const changePassword = async ({ id, userType, oldPassword, newPassword }: { id: number; userType: string; oldPassword: string; newPassword: string }): Promise<BaseResponse> => {
  return await getInstitute().then(institute =>
    post<BaseResponse>({
      endpoint: ApiEndpoints.CHANGE_PASSWORD,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
      data: {
        UserId: id,
        UserType: userType,
        OldPassword: oldPassword,
        NewPassword: newPassword,
      },
    }).then((response: any) => {
      return response as BaseResponse;
    }),
  );
};
