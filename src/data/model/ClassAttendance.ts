export interface ClassAttendnaceParams{
    admissionId: string|number;
    batchId: string|number;
    classId: string|number
    attendanceDate: string;
    attendanceStatus: string|number;
    leaveStatus: string|number;
    remarks: string
    attendanceModeId: string|number;
    academicYearId:string|number;
}