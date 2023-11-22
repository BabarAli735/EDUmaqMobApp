export interface MarksEntryObjParam{
    "id": number|string,
    "examCategoryId":  number|string,
    "examId":  number|string,
    "batchId":  number|string,
    "classId":  number|string,
    "isCoScholastic": boolean,
    "studentId": number|string,
    "subjectId":  number|string,
    "marks":  number|string,
    "academicYearId": number|string,
    "evaluvationType": number|string,
}

export type MarksEntryPostReqParam = MarksEntryObjParam[]
  
  