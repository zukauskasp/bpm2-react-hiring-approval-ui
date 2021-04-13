import React from "react";
import { withRouter } from "react-router";
import queryString from "query-string";
import { useSelector } from "react-redux";
import GenericForm from "./GenericForm";


const StartTask = props => {
  let redirect = useSelector(state => state.redirectReducer.redirect);
  let error = useSelector(state => state.redirectToErrorPageReducer);

  const queryParams = queryString.parse(props.location.search);
  const taskId = queryParams["taskId"];
  const callbackUrl = queryParams["callbackUrl"];
  const taskFormKey = props.match.params.taskFormKey;

  if (redirect) {
    window.location.href = callbackUrl;
  }

  if (error.showError) {
   console.error(error)
  }

  if (!!taskFormKey) {
    return (
      <div>
        <GenericForm
          formKey={taskFormKey}
          processDefinitionKey="HiringProcess"
          taskId={taskId}
        />
      </div>
    );
  }
};
export default withRouter(StartTask);
