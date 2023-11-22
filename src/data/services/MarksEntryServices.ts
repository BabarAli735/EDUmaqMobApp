import { AxiosResponse } from 'axios';
import { ApiEndpoints, get, getInstitute, post, SyllabusResponse } from '..';
import { MarksEntryPostReqParam } from '../model/MarksEntry';

// /* ------------- Api ------------- */
export const getExamCategories = async () => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<[]>>({
      endpoint: ApiEndpoints.EXAM_CATEGORIES,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};


export const getExamPlanners = async () => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<[]>>({
      endpoint: ApiEndpoints.EXAM_EXAMS,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};


export const getExamClasses = async ({id}:{id?:number}) => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<[]>>({
      endpoint: ApiEndpoints.EXAM_CLASSES+id,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};


export const getExamSubjects = async () => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<[]>>({
      endpoint: ApiEndpoints.EXAM_SUBJECTS,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};


export const getExamMarks = async ({categoryId,examId,classId,batchId,subjectId}:{categoryId:number,examId:number,classId:number,batchId:number,subjectId:number}) => {
  return await getInstitute().then(institute =>
    get<AxiosResponse<[]>>({
      endpoint: ApiEndpoints.EXAM_GET_MARKES+`ExamCatId=${categoryId}&ExamId=${examId}&ClassId=${classId}&BatchId=${batchId}&EvaluvationType=-1&subjectId=${subjectId}`,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};


export const postExamMarks = async (params: MarksEntryPostReqParam) => {
  return await getInstitute().then(institute =>
    post<AxiosResponse<any>>({
      endpoint: ApiEndpoints.EXAM_POST_MARKS,
      data: params,
      headers: { InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : '' },
    }),
  );
};