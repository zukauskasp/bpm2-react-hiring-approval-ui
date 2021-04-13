import {createAsyncActionTypes} from './constantFactory'

export const CALL_API = "Call API";
export const PROCESS_NAME = "Hiring Process";
export const FETCH_TASK_VARIABLES_TYPES = createAsyncActionTypes("TASK_VARIABLES")
export const COMPLETE_TASK_TYPES_WITH_VARS = createAsyncActionTypes("COMPLETE_TASK_WITH_VARS")
export const COMPLETE_TASK_TYPES_WITH_NO_VARS = createAsyncActionTypes("COMPLETE_TASK_WITH_NO_VARS")
export const GET_TASK_BY_ID_TYPES = createAsyncActionTypes("GET_TASK_BY_ID")
export const DELETE_PROCESS_INSTRANCE_BY_ID = createAsyncActionTypes("DELETE_PROCESS")
export const GET_EMPLOYEE_DETAILS_BY_ID = createAsyncActionTypes("GET_EMPLOYEE")

export const POSTPONE_TASK_TYPES = createAsyncActionTypes("POSTPONE_TASK")

export const AUTHENTICATE_USER = "AUTHENTICATE_USER"
export const REDIRECT_TO_ERROR_PAGE = "REDIRECT_TO_ERROR_PAGE"

export const SEND_FORM_VARS_TO_STORE = "SEND_FORM_VARS_TO_STORE"
export const REGISTER_TASK_TO_STORE = "REGISTER_TASK_TO_STORE"