import React, { useEffect } from "react";
import { withRouter } from "react-router";
import * as FormTypes from "../components/forms";
import {
  getTaskById,
  reigsterFormToVariableStore
} from "../redux/actions/actions";
import { useDispatch } from "react-redux";

const GenericFormFunction = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTaskById(taskId));
    dispatch(reigsterFormToVariableStore(formKey));
  });

  const { formKey, processDefinitionKey, taskId } = props;
  const Form = FormTypes[processDefinitionKey][formKey];

  if (Form) {
    return (
      <div>
        <Form taskId={taskId} formKey={formKey}></Form>
      </div>
    );
  }
};

export default withRouter(GenericFormFunction);
