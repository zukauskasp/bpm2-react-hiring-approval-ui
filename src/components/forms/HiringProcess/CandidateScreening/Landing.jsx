import React from "react";
import TabsComponent from "../../../reusableComponents/Tab/Tabs";
import PersonalDetails from '../SharedComponents/PersonalDetails/PersonalDetails'
import CandidateScreening from './CandidateScreening'

const LandingPage = props => {
  const { taskId } = props;
  const tabConfig = [
    {
      tabName: "Personal Details",
      readOnly: true,
      component: PersonalDetails
    },
    {
      tabName: "Candidate Screening",
      readOnly: true,
      component: CandidateScreening
    }
  ];
  return <TabsComponent taskId={taskId} tabConfig={tabConfig}></TabsComponent>;
};

export default LandingPage;
