import * as AT from "../../constants/constants";
import * as ACTIONS from "../actions";
import { CALL_API } from "../../constants/constants";

describe("Tests to ensure that action creators return correct action types", () => {
  it("should create correct action types on calling reigsterFormToVariableStore", () => {
    const formName = "Select Candidate";
    let objToTest = ACTIONS.reigsterFormToVariableStore(formName);
    expect(objToTest.type).toEqual(AT.REGISTER_TASK_TO_STORE);
    expect(objToTest).toHaveProperty("formName");
  });

  it("should create an action saveFormVariablesToStore", () => {
    const variables = "test";
    let objToTest = ACTIONS.saveFormVariablesToStore(variables);
    expect(objToTest.type).toEqual(AT.SEND_FORM_VARS_TO_STORE);
    expect(objToTest).toHaveProperty("data");
  });

  it("should create an action showErrorPage", () => {
    const errorMessage = "someError";
    let objToTest = ACTIONS.showErrorPage(errorMessage);
    expect(objToTest.type).toEqual(AT.REDIRECT_TO_ERROR_PAGE);
    expect(objToTest).toHaveProperty("errorMessage");
  });

  it("should create correct action types on calling fetchTaskVariables", () => {
    const taskId = "some task id";
    let objToTest = ACTIONS.fetchTaskVariables(taskId);
    expect(objToTest).toHaveProperty(CALL_API);
    expect(objToTest[CALL_API].types).toHaveLength(3);
    expect(
      objToTest[CALL_API].types.indexOf(AT.FETCH_TASK_VARIABLES_TYPES.START)
    ).toBeGreaterThanOrEqual(0);
    expect(
      objToTest[CALL_API].types.indexOf(AT.FETCH_TASK_VARIABLES_TYPES.SUCCESS)
    ).toBeGreaterThanOrEqual(0);
    expect(
      objToTest[CALL_API].types.indexOf(AT.FETCH_TASK_VARIABLES_TYPES.FAILURE)
    ).toBeGreaterThanOrEqual(0);
  });

  it("should create correct action types on calling compleTaskWithVars", () => {
    const taskId = "some task id";
    const variables = "test";
    let objToTest = ACTIONS.compleTaskWithVars(taskId, variables);
    expect(objToTest).toHaveProperty(CALL_API);
    expect(objToTest[CALL_API].settings.method).toEqual("POST");
    expect(objToTest[CALL_API].types).toHaveLength(3);
    expect(
      objToTest[CALL_API].types.indexOf(AT.COMPLETE_TASK_TYPES_WITH_VARS.START)
    ).toBeGreaterThanOrEqual(0);
    expect(
      objToTest[CALL_API].types.indexOf(
        AT.COMPLETE_TASK_TYPES_WITH_VARS.SUCCESS
      )
    ).toBeGreaterThanOrEqual(0);
    expect(
      objToTest[CALL_API].types.indexOf(
        AT.COMPLETE_TASK_TYPES_WITH_VARS.FAILURE
      )
    ).toBeGreaterThanOrEqual(0);
  });

  it("should create correct action types on calling compleTaskWithNoVars", () => {
    const taskId = "some task id";
    const variables = "test";
    let objToTest = ACTIONS.compleTaskWithNoVars(taskId, variables);
    expect(objToTest).toHaveProperty(CALL_API);
    expect(objToTest[CALL_API].settings.method).toEqual("POST");
    expect(objToTest[CALL_API].types).toHaveLength(3);
    expect(
      objToTest[CALL_API].types.indexOf(
        AT.COMPLETE_TASK_TYPES_WITH_NO_VARS.START
      )
    ).toBeGreaterThanOrEqual(0);
    expect(
      objToTest[CALL_API].types.indexOf(
        AT.COMPLETE_TASK_TYPES_WITH_NO_VARS.SUCCESS
      )
    ).toBeGreaterThanOrEqual(0);
    expect(
      objToTest[CALL_API].types.indexOf(
        AT.COMPLETE_TASK_TYPES_WITH_NO_VARS.FAILURE
      )
    ).toBeGreaterThanOrEqual(0);
  });

  it("should create correct action types on calling getTaskById", () => {
    const taskId = "some task id";
    let objToTest = ACTIONS.getTaskById(taskId);
    expect(objToTest).toHaveProperty(CALL_API);
    expect(objToTest[CALL_API].settings.method).toEqual("GET");
    expect(objToTest[CALL_API].types).toHaveLength(3);
    expect(
      objToTest[CALL_API].types.indexOf(AT.GET_TASK_BY_ID_TYPES.START)
    ).toBeGreaterThanOrEqual(0);
    expect(
      objToTest[CALL_API].types.indexOf(AT.GET_TASK_BY_ID_TYPES.SUCCESS)
    ).toBeGreaterThanOrEqual(0);
    expect(
      objToTest[CALL_API].types.indexOf(AT.GET_TASK_BY_ID_TYPES.FAILURE)
    ).toBeGreaterThanOrEqual(0);
  });

  it("should create correct action types on calling terminateProcessInstance", () => {
    const processInstanceId = "some task id";
    let objToTest = ACTIONS.terminateProcessInstance(processInstanceId);
    expect(objToTest).toHaveProperty(CALL_API);
    expect(objToTest[CALL_API].settings.method).toEqual("DELETE");
    expect(objToTest[CALL_API].types).toHaveLength(3);
    expect(
      objToTest[CALL_API].types.indexOf(AT.DELETE_PROCESS_INSTRANCE_BY_ID.START)
    ).toBeGreaterThanOrEqual(0);
    expect(
      objToTest[CALL_API].types.indexOf(
        AT.DELETE_PROCESS_INSTRANCE_BY_ID.SUCCESS
      )
    ).toBeGreaterThanOrEqual(0);
    expect(
      objToTest[CALL_API].types.indexOf(
        AT.DELETE_PROCESS_INSTRANCE_BY_ID.FAILURE
      )
    ).toBeGreaterThanOrEqual(0);
  });

  it("should create correct action types on calling fetchEmployeeDetailsById", () => {
    const employeeId = "B0000";
    let objToTest = ACTIONS.fetchEmployeeDetailsById(employeeId);
    expect(objToTest).toHaveProperty(CALL_API);
    expect(objToTest[CALL_API].settings.method).toEqual("GET");
    expect(objToTest[CALL_API].types).toHaveLength(3);
    expect(
      objToTest[CALL_API].types.indexOf(AT.GET_EMPLOYEE_DETAILS_BY_ID.START)
    ).toBeGreaterThanOrEqual(0);
    expect(
      objToTest[CALL_API].types.indexOf(AT.GET_EMPLOYEE_DETAILS_BY_ID.SUCCESS)
    ).toBeGreaterThanOrEqual(0);
    expect(
      objToTest[CALL_API].types.indexOf(AT.GET_EMPLOYEE_DETAILS_BY_ID.FAILURE)
    ).toBeGreaterThanOrEqual(0);
  });

  it("should create correct action types on calling postponeTask", () => {
    const taskId = "some task id";
    const values = "some value";
    let objToTest = ACTIONS.postponeTask(taskId,values);
    expect(objToTest).toHaveProperty(CALL_API);
    expect(objToTest[CALL_API].settings.method).toEqual("PUT");
    expect(objToTest[CALL_API].types).toHaveLength(3);
    expect(
      objToTest[CALL_API].types.indexOf(AT.POSTPONE_TASK_TYPES.START)
    ).toBeGreaterThanOrEqual(0);
    expect(
      objToTest[CALL_API].types.indexOf(AT.POSTPONE_TASK_TYPES.SUCCESS)
    ).toBeGreaterThanOrEqual(0);
    expect(
      objToTest[CALL_API].types.indexOf(AT.POSTPONE_TASK_TYPES.FAILURE)
    ).toBeGreaterThanOrEqual(0);
  });
});
