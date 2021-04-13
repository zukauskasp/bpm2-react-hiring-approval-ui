import * as AT from "../constants/constants";

export function taskVariableReducer(state = { error: "", items: [] }, action) {
  switch (action.type) {
    case AT.FETCH_TASK_VARIABLES_TYPES.START:
      return {
        ...state,
        items: []
      };
    case AT.FETCH_TASK_VARIABLES_TYPES.SUCCESS:
      let values = {};
      Object.keys(action.response).forEach(item => {
        values[item] = action.response[item].value;
      });
      return {
        ...state,
        items: values
      };

    case AT.FETCH_TASK_VARIABLES_TYPES.FAILURE:
      return {};
    default:
      return state;
  }
}

export function getTaskByIdReducer(state = { item: {} }, action) {
  switch (action.type) {
    case AT.GET_TASK_BY_ID_TYPES.START:
      return {
        ...state
      };

    case AT.GET_TASK_BY_ID_TYPES.SUCCESS:
      return {
        ...state,
        item: action.response
      };

    case AT.GET_TASK_BY_ID_TYPES.FAILURE:
      return {
        ...state
      };
    default:
      return state;
  }
}

export function redirectReducer(state = { redirect: false }, action) {
  switch (action.type) {
    case AT.DELETE_PROCESS_INSTRANCE_BY_ID.SUCCESS:
      return {
        ...state,
        redirect: true
      };

    case AT.COMPLETE_TASK_TYPES_WITH_VARS.SUCCESS:
      return {
        ...state,
        redirect: true
      };

    case AT.COMPLETE_TASK_TYPES_WITH_NO_VARS.SUCCESS:
      return {
        ...state,
        redirect: true
      };
    case AT.POSTPONE_TASK_TYPES.SUCCESS:
      return {
        ...state,
        redirect: true
      };
    default:
      return state;
  }
}

// possible message types: error, success, warning, info
export function messageReducer(state = { type: null, message: "" }, action) {
  const { type } = action;
  const matches = /(.*)_(BEGIN|SUCCESS|FAILURE)/.exec(type);
  if (!matches) return state;

  const [, , requestState] = matches;

  switch (requestState) {
    case "FAILURE":
      return {
        type: "error",
        message: action.error
      };
    default:
      return state;
  }
}

export function fetchEmployeeDetailsByIdReducer(state = { item: "" }, action) {
  switch (action.type) {
    case AT.GET_EMPLOYEE_DETAILS_BY_ID.START:
      return {
        ...state
      };

    case AT.GET_EMPLOYEE_DETAILS_BY_ID.SUCCESS:
      return {
        ...state,
        item: action.response
      };

    case AT.GET_EMPLOYEE_DETAILS_BY_ID.FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}

export function authenticateUserReducer(state = { user: "" }, action) {
  switch (action.type) {
    case AT.AUTHENTICATE_USER.START:
      return {
        ...state
      };
    case AT.AUTHENTICATE_USER.SUCCESS:
      return {
        ...state,
        user: action.data
      };

    default:
      return state;
  }
}

export function loadingReducer(state = { beginActionCount: 0 }, action) {
  const { type } = action;
  const matches = /(.*)_(BEGIN|SUCCESS|FAILURE)/.exec(type);

  if (!matches) return state;

  const [, , requestState] = matches;

  switch (requestState) {
    case "BEGIN":
      return {
        ...state,
        beginActionCount: state.beginActionCount + 1
      };
    case "SUCCESS":
      return {
        ...state,
        beginActionCount: state.beginActionCount - 1
      };
    case "FAILURE":
      return {
        ...state,
        beginActionCount: 0
      };
    default:
      return state;
  }
}

export function redirectToErrorPageReducer(
  state = { showError: false, errorMessage: "" },
  action
) {
  switch (action.type) {
    case AT.REDIRECT_TO_ERROR_PAGE:
      return {
        ...state,
        showError: true,
        errorMessage: action.errorMessage
      };
    default:
      return state;
  }
}

export function formVariablesReducer(
  state = {
    formName: "",
    componentVariables: []
  },
  action
) {
  switch (action.type) {
    case AT.SEND_FORM_VARS_TO_STORE:
      let formIndex = state.componentVariables.findIndex(
        f => f.componentName === action.data.componentName
      );
      if (formIndex === -1) {
        return {
          ...state,
          componentVariables: state.componentVariables.concat(action.data)
        };
      }
      const filteredComponentVariables = state.componentVariables
        .slice(0, formIndex)
        .concat(
          state.componentVariables.slice(
            formIndex + 1,
            state.componentVariables.length
          )
        );
      return {
        ...state,
        componentVariables: filteredComponentVariables.concat(action.data)
      };
    case AT.REGISTER_TASK_TO_STORE:
      return {
        ...state,
        formName: action.formName
      };
    default:
      return state;
  }
}


export function postponeReducer (state = { error: ""}, action) {
  switch (action.type) {
    case AT.POSTPONE_TASK_TYPES.START:
      return {
        ...state
      };

    case AT.POSTPONE_TASK_TYPES.SUCCESS:
      return {
        ...state,
      };

    case AT.POSTPONE_TASK_TYPES.FAILURE:
      return {
          error: action.errorMessage ,
          ...state
      };
    default:
      return state;
  }
}
