import React from "react";
import TabsComponent from "../../reusableComponents/Tab/Tabs";
import Documents from "./Documents";
import Comments from "./Comments";

export default function SupportArea() {
  const taskId = "";
  const tabConfig = [
    {
      tabName: "Documents",
      componentName: "documents",
      readOnly: true,
      component: Documents
    },
    {
      tabName: "Comments",
      componentName: "comments",
      readOnly: true,
      component: Comments
    }
  ];
  return <TabsComponent taskId={taskId} tabConfig={tabConfig}></TabsComponent>;
}
