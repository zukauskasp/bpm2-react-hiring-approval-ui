import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from './TabPanel';

const TabsComponent = ({ taskId, tabConfig }) => {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Tabs
          classes={{ indicator: classes.indicator }}
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {tabConfig ? tabConfig.map((tab, i) => {
            return (
              <Tab
                classes={{ wrapper: classes.wrapper, root: classes.container }}
                label={tab.tabName}
                key={i}
              />
            );
          }) : null}
        </Tabs>
      </AppBar>
      {tabConfig ? tabConfig.map((t, i) => {
        let Form = tabConfig[i].component;
        return (
          <TabPanel value={value} key={i} index={i}>
            <Form taskId={taskId}></Form>
          </TabPanel>
        );
      }) : null}
    </div>
  );
}


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    bpxShadow: 'none'
  },
  appBar: {
    backgroundColor: "#FFFFFF",
    boxShadow: 'none',
    borderBottom: '2px solid #bfcdd4'
  },
  indicator: {
    backgroundColor: "#003755",
    bottom: "10%"
  },
  wrapper: {
    color: "#113f61",
    fontSize: "16px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "normal",
    textTransform: "capitalize",
    fontFamily: "Danske Text v2"
  },
  container: {
    minWidth: "5px"
  }
}));

TabsComponent.propTypes = {
  taskId: PropTypes.string.isRequired,
  tabConfig: PropTypes.arrayOf(PropTypes.shape({
    tabName: PropTypes.string,
    component: PropTypes.function,
    readOnly: PropTypes.boolean
  })).isRequired,
};

export default TabsComponent;