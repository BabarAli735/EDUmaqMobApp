import { AxiosResponse } from 'axios';
import { ApiEndpoints, get, getInstitute,post } from '..';

// /* ------------- Api ------------- */
export const getMyStudents = async ({ teacherid }: { teacherid?: number }) => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<[]>>({
      endpoint: ApiEndpoints.MY_STUDENTS + "?TeacherId="+teacherid,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};

export const getMyComplaints = async ({ teacherid }: { teacherid?: number }) => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<[]>>({
      endpoint: ApiEndpoints.COMPLAIN_LIST + "?id="+teacherid,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
}

export const PostStudentComplaint = async ({ admissionId,subject,complaintDetail,status,isDeleted }: {  admissionId:number,subject:string,complaintDetail:string,status:boolean,isDeleted:boolean }) => {
  return await getInstitute().then(institute =>
    post<AxiosResponse<[]>>({
      endpoint: ApiEndpoints.SUBMIT_COMPLAIN_STUDENT,
      data:{ admissionId,subject,complaintDetail,status,isDeleted },
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};