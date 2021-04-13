import React from "react";
import "./app.scss";
import { Route } from "react-router-dom";
import StartTask from "./containers/StartTask";
import { Title, ProgressSteps, IdArea, SupportArea,FormNavigation} from "./components/layout";
import Spinner from "./components/layout/Spinner/Spinner";

export const App = () => {
  return (
    <div className="appGrid">
      <div className="title">
        <Title />
      </div>
      <div className="supportArea">
        <SupportArea />
      </div>
      <div className="stepsArea">
        <ProgressSteps />
      </div>
      <div className="idArea">
        <IdArea />
      </div>
      <div className="mainArea">
        <Route path="/start-task/:taskFormKey/" component={StartTask} />
      </div>
      <div className="actionControlArea">
        <FormNavigation />
      </div>
      <div className="spinnerArea">
        <Spinner />
      </div>
    </div>
  );
};
