import * as AT from "../../constants/constants";
import * as reducers from "../reducers";
import * as actions from "../../actions/actions";

describe("Tests to ensure redirect reducer state modification is correct", () => {
  it("redirect reducer should return the initial state", () => {
    expect(reducers.redirectReducer(undefined, {})).toEqual({
      redirect: false
    });
  });
  it("should handle DELETE_PROCESS_INSTRANCE_BY_ID.SUCCESS", () => {
    expect(
      reducers.redirectReducer([], {
        type: AT.DELETE_PROCESS_INSTRANCE_BY_ID.SUCCESS
      })
    ).toEqual({
      redirect: true
    });
  });
  it("should handle COMPLETE_TASK_TYPES.SUCCESS", () => {
    expect(
      reducers.redirectReducer([], {
        type: AT.COMPLETE_TASK_TYPES_WITH_NO_VARS.SUCCESS
      })
    ).toEqual({
      redirect: true
    });
  });
  it("should handle POSTPONE_TASK_TYPES.SUCCESS", () => {
    expect(
      reducers.redirectReducer([], {
        type: AT.POSTPONE_TASK_TYPES.SUCCESS
      })
    ).toEqual({
      redirect: true
    });
  });
});

describe("Tests to ensure message reducer state modification is correct", () => {
  let initialState = {
    type: null,
    message: ""
  };
  it("messageReducer reducer should return the initial state", () => {
    expect(reducers.messageReducer(undefined, {})).toEqual(initialState);
  });
  it("should handle any FAILURE action type", () => {
    let errorMessage = "some message";
    expect(
      reducers.messageReducer([], {
        type: AT.DELETE_PROCESS_INSTRANCE_BY_ID.FAILURE,
        error: errorMessage
      })
    ).toEqual({
      type: "error",
      message: errorMessage
    });
  });
  it("should return initial state when passed SUCCESS action type", () => {
    let errorMessage = "some message";
    expect(
      reducers.messageReducer(initialState, {
        type: AT.DELETE_PROCESS_INSTRANCE_BY_ID.SUCCESS,
        error: errorMessage
      })
    ).toEqual(initialState);
  });
  it("should return initial state when passed START action type", () => {
    let errorMessage = "some message";
    expect(
      reducers.messageReducer(initialState, {
        type: AT.DELETE_PROCESS_INSTRANCE_BY_ID.START,
        error: errorMessage
      })
    ).toEqual(initialState);
  });
});

describe("Tests to ensure loading reducer state modification is correct", () => {
  let initialState = {
    beginActionCount: 0
  };
  it("loading reducer should return the initial state when passed no action", () => {
    expect(reducers.loadingReducer(undefined, {})).toEqual(initialState);
  });
  it("should increment by 1 when any START action type is passed", () => {
    expect(
      reducers.loadingReducer(initialState, {
        type: "SOME_REQUEST_BEGIN"
      })
    ).toEqual({ beginActionCount: 1 });
  });
  it("should decrement by 1 when any SUCCESS action type is passed", () => {
    expect(
      reducers.loadingReducer(
        { beginActionCount: 1 },
        {
          type: "SOME_REQUEST_SUCCESS"
        }
      )
    ).toEqual({ beginActionCount: 0 });
  });
  it("should reset count to 0 when any FAILURE action type is passed", () => {
    expect(
      reducers.loadingReducer(
        { beginActionCount: 99 },
        {
          type: "SOME_REQUEST_FAILURE"
        }
      )
    ).toEqual({ beginActionCount: 0 });
  });
});

describe("Tests to ensure formVariable reducer state modification is correct", () => {
  let initialState = {
    formName: "",
    componentVariables: []
  };
  it("formVariableReducer should return intial state when no action is passed", () => {
    expect(reducers.formVariablesReducer(undefined, {})).toEqual(initialState);
  });
  it("should register form name when REGISTER_TASK_TO_STORE is passed", () => {
    let formName = "SomeName";
    expect(
      reducers.formVariablesReducer(
        initialState,
        actions.reigsterFormToVariableStore(formName)
      )
    ).toEqual({
      ...initialState,
      formName
    });
  });
  it("should save variable objet if reducer has intial state", () => {
    let varsFromComponent = {
      componentName: "component1",
      variables: { test1: "var1", test2: "some other var" }
    };
    expect(
      reducers.formVariablesReducer(
        initialState,
        actions.saveFormVariablesToStore(varsFromComponent)
      )
    ).toEqual({
      ...initialState,
      componentVariables: [varsFromComponent]
    });
  });
  it("should replace component variable object if already exists in the variable store", () => {
    let varsFromComponent = {
      componentName: "component1",
      variables: { test1: "var1", test2: "some other var" }
    };

    let varsFromComponent2 = {
      componentName: "component2",
      variables: { approver: "var1", isApproved: false }
    };

    initialState.componentVariables = [varsFromComponent, varsFromComponent2];

    let newVarsForComponentName1 = {
      componentName: "component1",
      variables: { test1: "new var!!", test2: "some other new var!!" }
    };

    expect(
      reducers.formVariablesReducer(
        initialState,
        actions.saveFormVariablesToStore(newVarsForComponentName1)
      )
    ).toEqual({
      ...initialState,
      componentVariables: [varsFromComponent2, newVarsForComponentName1]
    });
  });
});

describe("Tests to ensure redirectToErrorPageReducer state modification is correct", () => {
  let initialState = { showError: false, errorMessage: "" };
  it("should return initial state when no action is passed", () => {
    expect(reducers.redirectToErrorPageReducer(undefined, {})).toEqual(
      initialState
    );
  });
  it("should return showError true when REDIRECT_TO_ERROR_PAGE action is passed", () => {
    let someMessage = "someMessage";
    expect(
      reducers.redirectToErrorPageReducer(
        initialState,
        actions.showErrorPage(someMessage)
      )
    ).toEqual({ showError: true, errorMessage: someMessage });
  });
});

describe("Tests to ensure postponeReducer state modification is correct", () => {
  let initialState = { error: "" };
  it("should return initial state when no action is passed", () => {
    expect(reducers.postponeReducer(undefined, {})).toEqual(
      initialState
    );
  });
  it("should throw error when POSTPONE_TASK_TYPES.FAILURE action is passed", () => {
    let errorMessage = "errorMessage";
    expect(
      reducers.postponeReducer([],{
        type: AT.POSTPONE_TASK_TYPES.FAILURE,
        errorMessage: errorMessage
      })
    ).toEqual({ error: errorMessage });
  });
});




