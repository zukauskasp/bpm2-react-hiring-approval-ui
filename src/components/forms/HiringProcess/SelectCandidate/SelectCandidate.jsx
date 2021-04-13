import React, { useState, useEffect } from 'react';
import MultiSelect from "../../../reusableComponents/MultiSelect/MultiSelect";
import RadioButton from "../../../reusableComponents/RadioButton/RadioButton";
import { saveFormVariablesToStore } from "../../../../redux/actions/actions";
import Tooltip from "../../../reusableComponents/Tooltip/Tooltip";
import { useDispatch } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Icon from "../../../reusableComponents/Icon/Icon";

const SelectCandidates = () => {

  const componentName = "SelectCandidates"
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(saveFormVariablesToStore({ componentName, vars: { candidatesList: null } }));

  }, [dispatch, componentName]);

  const [names,] = useState([
    { name: 'Oliver Hansen', value: "oliverHandsen" },
    { name: 'Van Henry', value: "vanHenry" },
    { name: 'April Tucke', value: "apritTucke" },
    { name: 'Ralph Hubbard', value: "ralphHubbard" },
    { name: 'Omar Alexander', value: "omarAlexander" },
    { name: 'Carlos Abbott', value: "carlosAbbot" },
    { name: 'Miriam Wagner', value: "miriamWegner" },
    { name: 'Bradley Wilkerson', value: "bradleyWilkenson" },
    { name: 'Kelly Snyder', value: "kallySnyder" }
  ]);

  const [actions,] = useState([
    { name: "Call", value: "CONTACT_PHONE" },
    { name: "Write email", value: "WRITE_EMAIL" },
    { name: "Invite for interview", value: "INVITE", disabled: true }
  ]);

  const [selectedAction, setSelectedAction] = useState("WRITE_EMAIL");
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [candidatesListError, setCandidatesListError] = useState("");

  const handleChange = (value) => {
    if (validated(value)) {
      setCandidatesListError("");
      dispatch(saveFormVariablesToStore({ componentName, vars: { candidatesList: value } }));
    } else {
      dispatch(saveFormVariablesToStore({ componentName, vars: { candidatesList: [] } }));
    }
  }

  const handleRadioChange = (value) => {
    setSelectedAction(value)
    dispatch(saveFormVariablesToStore({ componentName, vars: { selectedAction: value } }));
  }

  const validated = (list) => {
    let error = 0;
    if (list.length === 0) {
      setCandidatesListError("Please Select at least one candidate")
      error++;
    }
    return error === 0
  }

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Grid item >
          <MultiSelect
            list={names}
            label="Choose candidates"
            onChange={(event, value) => { handleChange(value) }}
            errorMessage={candidatesListError}
          />
          <RadioButton
            label="Action"
            items={actions}
            onChange={e => handleRadioChange(e.target.value)}
            selectedItem={selectedAction}
            errorMessage="" />
        </Grid>
        <div style={{ width: '40%', position: 'relative', display: 'flex', justifyContent: 'flex-end' }}>
          {tooltipOpen ?
            <Tooltip text="Some page information" position="right" messageType='success' />
            :
            null
          }
          <Icon icon="info"
            style={{ cursor: "pointer", margin: '20px 15px' }}
            onMouseEnter={() => setTooltipOpen(true)}
            onMouseLeave={() => setTooltipOpen(false)} />
        </div>
      </Grid>
    </div>

  );
}

export default SelectCandidates;
