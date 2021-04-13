import axios from "axios";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";
import { apiMiddleware } from "../../../../redux/middleware/api.middleware";
import * as CONSTANTS from "../../../../redux/constants/constants";
import * as REDUCERS from "../../../../redux/reducers/reducers";
import {
  doPostComplete,
  areVarsRequiredToComplete,
  doesRegisteredFormHasCompletionConfig,
  formCompletionConfig,
  extractVariablesForCompletion
} from "../actions";

var mock = new MockAdapter(axios);
let middlewares = [thunk, apiMiddleware(axios)];
const mockStore = configureMockStore(middlewares);
let store = {};

const createStoreForTests = initStore => {
  const createState = initialState => actions =>
    actions.reduce(REDUCERS.formVariablesReducer, initStore);

  const initialState = createState({});
  store = mockStore(initialState);
};

describe("Test validation methods before dispatching complete action", () => {
  it("should return config as fornName submitJobRequisition does have completion config available", () => {
    const storeWithExistingFormName = {
      formName: "submitJobRequisition",
      componentVariables: [{ componentName: "", variables: {} }]
    };
    const { formConfig } = doesRegisteredFormHasCompletionConfig(
      storeWithExistingFormName,
      formCompletionConfig
    );
    expect(formConfig).toBeTruthy();
  });

  it("should return undefined config as fornName SomeForm does not have completion config available", () => {
    const storeWithExistingFormName = {
      formName: "someFormName",
      componentVariables: [{ componentName: "", variables: {} }]
    };
    const { formConfig } = doesRegisteredFormHasCompletionConfig(
      storeWithExistingFormName,
      formCompletionConfig
    );
    expect(formConfig).toBeUndefined();
  });

  it("method areVarsRequiredToComplete should return true when form config object is passed with variablesRequiredToComplete: true", () => {
    const formConfig = {
      taskName: "submitJobRequisition",
      variablesRequiredToComplete: true
    };
    expect(areVarsRequiredToComplete(formConfig)).toEqual(true);
  });

  it("method areVarsRequiredToComplete should return false when form config object is passed with variablesRequiredToComplete: false", () => {
    const formConfig = {
      taskName: "approveRequisitionRequest",
      variablesRequiredToComplete: false
    };
    expect(areVarsRequiredToComplete(formConfig)).toEqual(false);
  });

  it("method extractVariablesForCompletion should correctly extract variables for form completion (single component)", () => {
    const componentVariables = [
      { componentName: "approvalComponent", vars: { approval: true } }
    ];
    const variableNamesRequiredForTaskToComplete = [
      {
        camundaVariableName: "isGmApproved",
        componentVariableName: "approval"
      }
    ];

    let variablesForCompletion = extractVariablesForCompletion(variableNamesRequiredForTaskToComplete, componentVariables);
    expect(variablesForCompletion).toHaveProperty("variables");
    expect(variablesForCompletion.variables).toBeTruthy();
  });

  it("method extractVariablesForCompletion should correctly extract variables for form completion (multiple component)", () => {
    const componentVariables = [
      { componentName: "approvalComponent", vars: { approval: true } },
      { componentName: "hrComponenent", vars: { hrComment: "someComment" } }
    ];
    const variableNamesRequiredForTaskToComplete = [
      {
        camundaVariableName: "isGmApproved",
        componentVariableName: "approval"
      },
      {
        camundaVariableName: "comment",
        componentVariableName: "hrComment"
      }
    ];

    let variablesForCompletion = extractVariablesForCompletion(variableNamesRequiredForTaskToComplete, componentVariables);
    expect(variablesForCompletion).toHaveProperty("variables");
    expect(variablesForCompletion.variables).toBeTruthy();
    expect(Object.keys(variablesForCompletion.variables)).toHaveLength(2);
  });
});

describe("Test doPostComplete method flow", () => {
  let employeeResponeMock = { employeeId: { value: "BD0000" } };
  mock.onPost(/.*\/task\/.+/).reply(200, employeeResponeMock);

  it("should dispatch action COMPLETE_TASK_TYPES_WITH_NO_VARS when form does not require variables to complete", () => {
    const initStore = {
      formVariablesReducer: {
        formName: "submitJobRequisition",
        componentVariables: [{ componentName: "", variables: {} }]
      }
    };

    createStoreForTests(initStore);
    store.dispatch(doPostComplete("taskId")).then(data => {
      expect(data.type).toEqual(
        CONSTANTS.COMPLETE_TASK_TYPES_WITH_NO_VARS.SUCCESS
      );
    });
  });

  it("should dispatch action COMPLETE_TASK_TYPES_WITH_VARS when form does require variables to complete", () => {
    const initStore = {
      formVariablesReducer: {
        formName: "approveRequisitionRequest",
        componentVariables: [{ componentName: "", vars: {} }]
      }
    };

    createStoreForTests(initStore);
    store.dispatch(doPostComplete("taskId")).then(data => {
      expect(data.type).toEqual(
        CONSTANTS.COMPLETE_TASK_TYPES_WITH_VARS.SUCCESS
      );
    });
  });
});

describe("Test doPostComplete method if throws error on certain condition", () => {
  it("should throw error when ivoking doPostComplete with non existing formStore againt completion config", () => {
    const initStore = {
      formVariablesReducer: {
        formName: "someNoneExistingForm",
        componentVariables: [{ componentName: "", variables: {} }]
      }
    };
    createStoreForTests(initStore);

    expect(() => {
      store.dispatch(doPostComplete("taskId")).then(data => {
        expect(data.type).toEqual(
          CONSTANTS.COMPLETE_TASK_TYPES_WITH_VARS.SUCCESS
        );
      });
    }).toThrow();
  });
});
