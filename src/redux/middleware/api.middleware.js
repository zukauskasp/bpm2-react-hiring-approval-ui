import { camelizeKeys } from "humps";
import {CALL_API} from '../constants/constants'
let apiClient = {}
export const apiMiddleware = (client) => {
  return store => next => action => {
    apiClient = client
    const callAPI = action[CALL_API];

    if (typeof callAPI === "undefined") {
      return next(action);
    }

    const { types, settings } = callAPI;

    if (!Array.isArray(types) || types.length !== 3) {
      throw new Error("Expected an array of three action types.");
    }
    if (!types.every(type => typeof type === "string")) {
      throw new Error("Expected action types to be strings.");
    }

    const actionWith = data => {
      const finalAction = Object.assign({}, action, data);
      delete finalAction[CALL_API];
      return finalAction;
    };

    const [requestType, successType, failureType] = types;
    next(actionWith({ type: requestType }));

    return callApi(settings).then(
      response =>
        next(
          actionWith({
            response,
            type: successType
          })
        ),
      error =>
        next(
          actionWith({
            type: failureType,
            error:
              (error.statusText || "An error has occured") +
              ". Message: " +
              error.message
          })
        )
    );
  };
};
const callApi = (settings = {}) => {
  return apiClient(settings)
    .then(response => {
      return camelizeKeys(response.data);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};
