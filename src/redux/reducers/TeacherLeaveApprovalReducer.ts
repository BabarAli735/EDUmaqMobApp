import { TeacherLeaveApproval } from '../../data/model/TeacherLeaveApproval';
import { ResponseError } from '../../utils';
import { TeacherLeaveApprovalAction, TeacherLeaveApprovalFailure, TeacherLeaveApprovalSuccess } from '../actions/TeacherLeaveApprovalActions';
import { TEACHER_LEAVE_APPROVAL_FAILURE, TEACHER_LEAVE_APPROVAL_REQUEST, TEACHER_LEAVE_APPROVAL_SUCCESS } from '../constants/TeacherLeaveApprovalConstant';

/* ------------- State ------------- */
type TeacherLeaveApprovalStateType = typeof initialState;
export interface TeacherLeaveApprovalState extends TeacherLeaveApprovalStateType {}

const initialState = {
  isLoading: false,
  teacherLeaveApproval: undefined as TeacherLeaveApproval | undefined,
  error: undefined as ResponseError | undefined,
};

/* ------------- Reducers ------------- */
const teacherLeaveApprovalRequest = (state: TeacherLeaveApprovalState): TeacherLeaveApprovalState => ({
  ...state,
  isLoading: true,
  error: undefined,
});

const teacherLeaveApprovalSuccess = (state: TeacherLeaveApprovalState, action: TeacherLeaveApprovalSuccess): TeacherLeaveApprovalState => ({
  ...state,
  teacherLeaveApproval: action.teacherLeaveApproval,
  isLoading: false,
  error: undefined,
});

const teacherLeaveApprovalFailure = (state: TeacherLeaveApprovalState, action: TeacherLeaveApprovalFailure): TeacherLeaveApprovalState => ({
  ...state,
  teacherLeaveApproval: undefined,
  isLoading: false,
  error: action.error,
});

export const TeacherLeaveApprovalReducer = (state: TeacherLeaveApprovalState | undefined = initialState, action: TeacherLeaveApprovalAction): TeacherLeaveApprovalState => {
  switch (action.type) {
    case TEACHER_LEAVE_APPROVAL_REQUEST:
      return teacherLeaveApprovalRequest(state);
    case TEACHER_LEAVE_APPROVAL_SUCCESS:
      return teacherLeaveApprovalSuccess(state, action);
    case TEACHER_LEAVE_APPROVAL_FAILURE:
      return teacherLeaveApprovalFailure(state, action);
    default:
      return state;
  }
};
