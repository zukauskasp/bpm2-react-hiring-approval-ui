import React from "react";
import "./spinner.scss";
import { useSelector } from "react-redux";

export default function Spinner() {
  const actionCounter = useSelector(
    state => state.loadingReducer.beginActionCount
  );

  return actionCounter ? <div className="loading"></div> : <div></div>;
}
