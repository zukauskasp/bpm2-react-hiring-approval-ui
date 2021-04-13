import * as actions from "../../../redux/actions/actions";

export const formCompletionConfig = [
  {
    taskName: "submitJobRequisition",
    variablesRequiredToComplete: false,
    variableNamesToComplete: null
  },
  {
    taskName: "approveRequisitionRequest",
    variablesRequiredToComplete: true,
    variableNamesToComplete: [
        {
          camundaVariableName: "isGmApproved",
          componentVariableName: "approval"
        }
      ]
  },
  {
    taskName: "findCandidate",
    variablesRequiredToComplete: true,
    variableNamesToComplete: [{
        camundaVariableName: "candidatesList",
        componentVariableName: "candidatesList"
      }]
  },
  {
    taskName: "screeningValidation",
    variablesRequiredToComplete: false,
    variableNamesToComplete: null
  }
];

export const extractVariablesForCompletion = (requiredFormVars, componentVars) => {
  let vars = {};
  requiredFormVars.forEach(fv => {
    componentVars.forEach(cv => {
      if (cv.vars.hasOwnProperty(fv.componentVariableName)) {
        vars[fv.camundaVariableName] = {
          value: cv.vars[fv.componentVariableName]
        };
      }
    })

  });

  if (!vars)
    throw Error(
      "Variable mapping not found to complete the task. Please check formCompletionConfig."
    );

  return {variables: vars};
};

export function areVarsRequiredToComplete(formConfig) {
  return formConfig.variablesRequiredToComplete;
}

export function doesRegisteredFormHasCompletionConfig(formStore) {
  const { formName, componentVariables } = formStore;
  var formConfig = formCompletionConfig.find(
    formConfig => formConfig.taskName === formName
  );
  return { formConfig, componentVariables };
}

export const doPostComplete = taskId => {
  return (dispatch, getState) => {
    let store = getState();
    const formStore = store.formVariablesReducer;
    const {
      formConfig,
      componentVariables
    } = doesRegisteredFormHasCompletionConfig(formStore, formCompletionConfig);

    if (!formConfig)
      throw Error(
        `Form registered in formStore called - ${formStore.formName} does not have config. Need to add in formCompletionConfig object`
      );

    let areVarsRequired = areVarsRequiredToComplete(formConfig);

    if (areVarsRequired) {
      let vars = extractVariablesForCompletion(
        formConfig.variableNamesToComplete,
        componentVariables
      );
      return dispatch(actions.compleTaskWithVars(taskId, vars));
    } else {
      return dispatch(actions.compleTaskWithNoVars(taskId));
    }
  };
};
