import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import Icon from "../../reusableComponents/Icon/Icon";

const IdArea = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel style={{ backgroundColor: "#003755" }}>
        <ExpansionPanelSummary
          expandIcon={<Icon icon="expand" color="white" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.mainHeader}
        >

          <div className={classes.column}>
            <Typography className={classes.headerDetails} >
              B00001 - First Name - Last Name
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.headerDetails}>
              5878798798798 - Customer Name
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.headerDetails}>
              CaseID - 000000
            </Typography>
          </div>

        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expandedPanel}>

          <div className={classes.column}>
            <Typography className={classes.expandedDetails}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis.
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.expandedDetails}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis.
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.expandedDetails}>
              Case variations
            </Typography>
            <ul className={classes.listDetails}>
                <li>Lorem ipsum dolor sit amet, </li>
                <li>Lorem ipsum dolor sit amet, </li>
                <li>Lorem ipsum dolor sit amet, </li>
              </ul>
          </div>

        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#F0F7FA",
  },
  mainHeader: {
    height: `35px`,
    fontWeight: theme.typography.fontWeightRegular,
    color: "#FFFFFF",
    objectFit: "contain",
    minHeight: 'initial',
    "&.Mui-expanded": {
      minHeight: 'initial',
    },
  },
  headerDetails: {
    fontSize: `16px`,
  },
  expandIcon: {
    color: "#FFFFFF"
  },
  column: {
    flexBasis: '33.33%',
    padding: theme.spacing(1, 2),
    '&:not(:last-child)':{
      borderRight: `1px solid white`,
    },
    lineHeight: 1.71
  },
  expandedPanel: {
    borderTop: `2px solid white`,
    padding: `8px 57px 8px 24px`,
    color: "#FFFFFF",
  },
  expandedDetails: {
    fontSize: `14px`,
  },
  listDetails: {
    paddingLeft: `16px`
  }
}));

export default IdArea;