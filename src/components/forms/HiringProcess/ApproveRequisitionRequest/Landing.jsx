import React from "react";
import TabsComponent from "../../../reusableComponents/Tab/Tabs";
import PersonalDetails from '../SharedComponents/PersonalDetails/PersonalDetails'
import ApprovalForm from './ApproveJobRequisition'

const LandingPage = props => {
  const { taskId } = props;
  const tabConfig = [
    {
      tabName: "Personal Details",
      component: PersonalDetails
    },
    {
      tabName: "Approval Form",
      component: ApprovalForm
    }
  ];
  return <TabsComponent taskId={taskId} tabConfig={tabConfig}></TabsComponent>;
};

export default LandingPage;
