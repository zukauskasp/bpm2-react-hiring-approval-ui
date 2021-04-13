import React from "react";
import TabsComponent from "../../../reusableComponents/Tab/Tabs";
import PersonalDetails from '../SharedComponents/PersonalDetails/PersonalDetails'
import SelectCandidate from './SelectCandidate'

const LandingPage = props => {
  const { taskId } = props;
  const tabConfig = [
    {
      tabName: "Personal Details",
      readOnly: true,
      component: PersonalDetails
    },
    {
      tabName: "Select Candidates",
      readOnly: true,
      component: SelectCandidate
    }
  ];
  return <TabsComponent taskId={taskId} tabConfig={tabConfig}></TabsComponent>;
};

export default LandingPage;
