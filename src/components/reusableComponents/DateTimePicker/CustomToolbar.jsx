import React,{useState} from 'react';

import PickerToolbar from "@material-ui/pickers/_shared/PickerToolbar";
import TextField from "../TextField/TextField";

const CustomToolbar = ({selectedDate, isHoursDisabled}) =>{

	const minutes = selectedDate.getMinutes() < 10 ? "0" + selectedDate.getMinutes() : selectedDate.getMinutes();
	const hours = selectedDate.getHours() < 10 ? "0" + selectedDate.getHours() : selectedDate.getHours();

	const [selectedHours, setSelectedHours] = useState(hours + ":" + minutes);

	const onHoursChange = (time) => {
		if (time !== "") {

			var hours = time.split(":")[0];
			var minutes = time.split(":")[1];

			const displayTime = hours + ":" + minutes;

			setSelectedHours(displayTime);
			selectedDate.setHours(hours,minutes)
		}
	}

  return(
    <PickerToolbar title='Select time' isLandscape={true}>
      <	TextField
				name="posponeHours"
				value={selectedHours}
				type="time"
				onChange={(e)=>{onHoursChange(e.target.value)}}
				placeholder=""
				label="Select time"
				readonly={isHoursDisabled}
			/>
    </PickerToolbar>
  )
}

export default CustomToolbar;