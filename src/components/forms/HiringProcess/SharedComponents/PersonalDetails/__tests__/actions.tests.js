import axios from "axios";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";
import { apiMiddleware } from "../../../../../../redux/middleware/api.middleware";
import * as CONSTANTS from "../../../../../../redux/constants/constants";
import { getEmployeeDetails } from "../actions";

var mock = new MockAdapter(axios);
let middlewares = [thunk, apiMiddleware(axios)];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

describe("Test getEmployeeDetails action creator", () => {
  let taskResponseMock = { employeeId: { value: "BD0000" }};
  let employeeReponseMock = { bNumber: "BD0000" };
  mock.onGet(/.*\/task\/.+/).reply(200, taskResponseMock);
  mock.onGet(/.*\/employee\/.+/).reply(200, employeeReponseMock);
  
  it("should return success action type and correct data payload", () => {
    let taskId = "someGUID";
    return store.dispatch(getEmployeeDetails(taskId)).then(data => {
      expect(data.type).toEqual(CONSTANTS.GET_EMPLOYEE_DETAILS_BY_ID.SUCCESS);
      expect(data.response).toEqual(employeeReponseMock);
    });
  });
});
