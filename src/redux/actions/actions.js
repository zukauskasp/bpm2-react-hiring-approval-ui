import { CALL_API } from "../constants/constants";
import * as AT from "../constants/constants";
const camundaAPI = process.env.REACT_APP_CAMUNDA_URL;
const groupServicesAPI = process.env.REACT_APP_GROUP_SERVICES_API_URL;

export const fetchTaskVariables = taskId => {
  return {
    [CALL_API]: {
      types: [
        AT.FETCH_TASK_VARIABLES_TYPES.START,
        AT.FETCH_TASK_VARIABLES_TYPES.SUCCESS,
        AT.FETCH_TASK_VARIABLES_TYPES.FAILURE
      ],
      settings: {
        method: "GET",
        url: `${camundaAPI}/rest/engine/default/task/${taskId}/variables`
      }
    }
  };
};

export const compleTaskWithVars = (taskId, values) => ({
  [CALL_API]: {
    types: [
      AT.COMPLETE_TASK_TYPES_WITH_VARS.START,
      AT.COMPLETE_TASK_TYPES_WITH_VARS.SUCCESS,
      AT.COMPLETE_TASK_TYPES_WITH_VARS.FAILURE
    ],
    settings: {
      method: "POST",
      url: `${camundaAPI}/rest/engine/default/task/${taskId}/complete`,
      data: JSON.stringify(values)
    }
  }
});

export const compleTaskWithNoVars = (taskId) => ({
  [CALL_API]: {
    types: [
      AT.COMPLETE_TASK_TYPES_WITH_NO_VARS.START,
      AT.COMPLETE_TASK_TYPES_WITH_NO_VARS.SUCCESS,
      AT.COMPLETE_TASK_TYPES_WITH_NO_VARS.FAILURE
    ],
    settings: {
      method: "POST",
      url: `${camundaAPI}/rest/engine/default/task/${taskId}/complete`,
      data: {}
    }
  }
});

export const getTaskById = taskId => ({
  [CALL_API]: {
    types: [
      AT.GET_TASK_BY_ID_TYPES.START,
      AT.GET_TASK_BY_ID_TYPES.SUCCESS,
      AT.GET_TASK_BY_ID_TYPES.FAILURE
    ],
    settings: {
      method: "GET",
      url: `${camundaAPI}/rest/engine/default/task/${taskId}`
    }
  }
});

export const terminateProcessInstance = processInstanceId => ({
  [CALL_API]: {
    types: [
      AT.DELETE_PROCESS_INSTRANCE_BY_ID.START,
      AT.DELETE_PROCESS_INSTRANCE_BY_ID.SUCCESS,
      AT.DELETE_PROCESS_INSTRANCE_BY_ID.FAILURE
    ],
    settings: {
      method: "DELETE",
      url: `${camundaAPI}/rest/engine/default/process-instance/${processInstanceId}`,
      data: {}
    }
  }
});

export const fetchEmployeeDetailsById = employeeId => ({
  [CALL_API]: {
    types: [
      AT.GET_EMPLOYEE_DETAILS_BY_ID.START,
      AT.GET_EMPLOYEE_DETAILS_BY_ID.SUCCESS,
      AT.GET_EMPLOYEE_DETAILS_BY_ID.FAILURE
    ],
    settings: {
      method: "GET",
      url: `${groupServicesAPI}/api/v1/employee/${employeeId}`
    }
  }
});

export const postponeTask = (taskId,values) => {
  return {
    [CALL_API]: {
      types: [
          AT.POSTPONE_TASK_TYPES.START,
          AT.POSTPONE_TASK_TYPES.SUCCESS,
          AT.POSTPONE_TASK_TYPES.FAILURE
      ],
      settings: {
          method: "PUT",
          url: `${camundaAPI}/rest/engine/default/task/${taskId}`,
          data: JSON.stringify(values)
      }
    }
  };
};



export const authenticateUserBegin = () => ({
  type: AT.AUTHENTICATE_USER.START
});

export const authenticateUser = user => ({
  type: AT.AUTHENTICATE_USER.SUCCESS,
  data: user
});

export const showErrorPage = errorMessage => ({
  type: AT.REDIRECT_TO_ERROR_PAGE,
  errorMessage
});

export const saveFormVariablesToStore = (variables) => ({
  type: AT.SEND_FORM_VARS_TO_STORE,
  data: variables
})

export const reigsterFormToVariableStore = (formName) => ({
  type: AT.REGISTER_TASK_TO_STORE,
  formName
})
