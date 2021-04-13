import React,{useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { format, parseISO  } from 'date-fns';

import { doPostComplete } from "./actions";
import {postponeTask, terminateProcessInstance} from '../../../redux/actions/actions';

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CustomButton from "../../reusableComponents/Button/Button";
import Modal from "../../reusableComponents/Modal/Modal";
import DateTimePicker from '../../reusableComponents/DateTimePicker/DateTimePicker';
import SingleSelect from '../../reusableComponents/SingleSelect/SingleSelect';
import CustomCheckbox from '../../reusableComponents/Checkbox/Checkbox';



const FormNavigation = () => {
  const [openSaveAndPostpone, setOpenSaveAndPostpone] = useState(false);
  const [openTerminate, setOpenTerminate] = useState(false);
	const [postponeReason, setPostponeReason] = useState("");
	const [isReasigned, setIsReasigned] = useState(false);
  const [selectedDate, setDate] = useState(new Date());

  const task = useSelector(state => state.getTaskByIdReducer.item);
  const dispatch = useDispatch();

  const onPostponeSubmit = () => {
		if(selectedDate && postponeReason !== "" ){
			const dateForRequest = format(parseISO(selectedDate.toISOString()), "yyyy-MM-dd'T'HH:mm:ss.SSSXX");

			dispatch(postponeTask(task.id, {
				//set team in future?
				...task,
				assignee: isReasigned ? null : task.assignee,
				due: dateForRequest,
			}));
		}	
  }
  
  const onTerminateSubmit = () => {
    dispatch(terminateProcessInstance(task.processInstanceId));
  }
  
  const handleTaskComplete = (event) => {
    event.preventDefault();
    dispatch(doPostComplete(task.id));
  }

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      style={{ marginTop: 20 /* background: "#003755", padding: '20px' */ }}
    >
      <Paper elevation={0} style={{ background: "transparent" }}>
        <CustomButton
          text="Terminate"
          buttonType="secondary"
          icon="remove"
          onClickEvent={()=>setOpenTerminate(true)}
        />

        <Modal title="Terminate case?"
          onClose={()=>{setOpenTerminate(false)}}
          open={openTerminate}
          submitButtonText="Terminate"
          onSubmit={onTerminateSubmit}
        >
          <p>You are about to terminate the case - you cannot make changes if you terminate.</p>
        </Modal>


      </Paper>
      <Paper elevation={0} style={{ background: "transparent" }}>
        <CustomButton
          text="Postpone"
          buttonType="primary"
          onClickEvent={()=>{setOpenSaveAndPostpone(true)}}
        />
        <CustomButton
          text="Save"
          buttonType="primary"
          onClickEvent={handleTaskComplete}
          icon="next"
        />

        <Modal title="Save and postpone"
          onClose={()=>{setOpenSaveAndPostpone(false)}}
          open={openSaveAndPostpone}
          submitButtonText="Save and postpone"
          onSubmit={onPostponeSubmit}
        >
          <DateTimePicker
            id="date-picker-inline"
            label="Select due date"
            country="lt"
            isWeekendsDisabled={true}
            isHolidaysDisabled={true}
            isHoursDisabled={false}
            format="MM/dd/yyyy HH:mm"
            disablePast={true}
            showTodayButton={true}
            selectedDate={selectedDate}
            setDate={setDate}
            inputVariant="outlined"
          />
          <SingleSelect 
            label="Select reason"
            items={[{value: "", name:""},{value: "vienas", name:"vienas"},{value: "du", name:"du"},{value: "trys", name:"trys"}]}
            value={postponeReason}
            onChange={e => setPostponeReason(e.target.value)}
          />
          <CustomCheckbox 
            label='Reasign back to team'
            checked={isReasigned}
            onChange={()=> setIsReasigned(!isReasigned)}
            value={isReasigned}
          />
        </Modal>
        

      </Paper>
      
    </Grid>
  );
};

export default FormNavigation;
