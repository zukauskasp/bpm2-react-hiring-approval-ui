import React from "react";
import TabsComponent from "../../../reusableComponents/Tab/Tabs";
import PersonalDetails from '../SharedComponents/PersonalDetails/PersonalDetails'
import VacancyDetails from './VacancyDetails'
import CustomerFolder from '../SharedComponents/CustomerFolder/CustomerFolder'

const LandingPage = props => {
  const { taskId } = props;
  const tabConfig = [
    {
      tabName: "Personal Details",
      readOnly: true,
      component: PersonalDetails
    },
    {
      tabName: "Vacancy Details",
      readOnly: true,
      component: VacancyDetails
    },
    {
      tabName: "Customer folder",
      readOnly: true,
      component: CustomerFolder
    },
  ];
  return <TabsComponent taskId={taskId} tabConfig={tabConfig}></TabsComponent>;
};

export default LandingPage;
