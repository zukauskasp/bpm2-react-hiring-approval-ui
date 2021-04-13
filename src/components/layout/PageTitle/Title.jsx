import React from "react";
import { PROCESS_NAME } from "../../../redux/constants/constants";
import { useSelector } from "react-redux";

import "./title.scss";

export default function Title() {

  const proccessDefinition = useSelector(
    state => state.getTaskByIdReducer.item
  );


  return (
    <div className="titleArea">
      <h3>{proccessDefinition.name || PROCESS_NAME}</h3>
    </div>
  );
};

