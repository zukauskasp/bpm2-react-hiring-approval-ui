import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import axios from "axios";
import { apiMiddleware } from "./middleware/api.middleware";

const client = axios.create({
  responseType: "json",
  headers: { Accept: "application/json", "Content-Type": "application/json" }
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, apiMiddleware(client)))
);

export default store;
