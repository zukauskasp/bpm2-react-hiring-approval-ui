import React from 'react';
import PropTypes from 'prop-types';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DatePicker 
} from '@material-ui/pickers';
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

import CustomToolbar from "./CustomToolbar";
import Holidays from "date-holidays";

const DateTimePicker = ({country,isWeekendsDisabled,isHolidaysDisabled,selectedDate, setDate,defaultHours,isHoursDisabled, ...otherProps}) => {

    const holidays = isHolidaysDisabled && country ? new Holidays(country.toUpperCase()): null;

    const disableWeekends = (date) => {
      return date.getDay() === 0 || date.getDay() === 6;
    }

    const disableHolidays = (date) => {
      return holidays.isHoliday(date) || disableWeekends(date);
    }
    
    const disableDates = (date) => {
        return ( isWeekendsDisabled && disableWeekends(date)) || (isHolidaysDisabled && disableHolidays(date));
	}

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            	<ThemeProvider theme={materialTheme}>
					<DatePicker 
						{...otherProps}
						variant="dialog"
						value={selectedDate}
						orientation='landscape'
						ToolbarComponent={()=>(<CustomToolbar selectedDate={selectedDate} isHoursDisabled={isHoursDisabled}/>)}
						onChange={(date) => {setDate(date)}}
						onAccept={(date)=> setDate(selectedDate && date ? 
													new Date(
														date.getFullYear(),
														date.getMonth(),
														date.getDate(),
														selectedDate.getHours(),
														selectedDate.getMinutes()) 
													: date)}

						shouldDisableDate={disableDates}
					/>
                </ThemeProvider>
            </MuiPickersUtilsProvider>
        </div>
    )
}


const materialTheme = createMuiTheme({
	overrides: {
		MuiOutlinedInput: {
			"root": {
				'&$focused $notchedOutline': {
					borderColor: "rgb(0, 159, 218)",
					borderWidth: "1px",
					outline: "0 none"
				},
				"&$error $notchedOutline": {
					borderColor: "rgba(0, 0, 0, 0.23)"
				},
			}
		},
		MuiFormLabel: {
			root: {
				"&$error": {
					color: 'rgba(0, 0, 0, 0.54)'
				}
			}
		},
	  	MuiPickersDay: {
			day: {
		  	color: '#003755'
		},
		daySelected: {
		  	backgroundColor: '#009FDA',
		  		'&:hover': {
					backgroundColor: '#003755'
		  		}
			},
			dayDisabled: {
		  		color: '#C5C8CB',
			},
	  	},
	  	MuiPickersToolbar: {
			toolbar: {
		  		backgroundColor: '#f9fafa',
			},
			toolbarLandscape:{
				alignItems: 'flex-start'
			}
		},
	  	MuiPickersModal: {
			withAdditionalAction:{
		  		backgroundColor: '#f9fafa',
			}
	  	},
	 	MuiButton: {
			textPrimary: {
		  		color:'#009FDA'
	  		}
		},
		MuiTextField: {
			root: {
				width: '280px',
				margin: '0 0 10px 0',
				backgroundColor: '#fff'
			}
		},
		MuiInputBase: {
			root: {
				height: '48px'
			}
		},
		MuiFormHelperText: {
			root: {
				background: '#FBB273',
				position:'relative',
				left: '0',
				top: '110%',
				color: 'white',
				height: '48px',
				lineHeight: '48px',
				fontSize: '14px',
				minWidth: '280px',
				padding: '0 0.8rem',
				marginTop: '10px',

				'&::before': {
					content: '""',
					position: 'absolute',
					top: '-18%',
					width: '0',
					height: '0',
					borderLeft: '10px solid transparent',
					borderRight: '10px solid transparent',
					borderBottom: '10px solid #FBB273'
				},
				"&$error": {
					color: "white"
				},
			},
			contained: {
				marginLeft: 'unset'
			},
			},
	},
});  

DateTimePicker.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	setDate: PropTypes.func.isRequired,
	selectedDate: PropTypes.instanceOf(Date).isRequired, 
	country: PropTypes.string, 
	defaultHours: PropTypes.string,
	format: PropTypes.string,
	showTodayButton: PropTypes.bool,
	isWeekendsDisabled: PropTypes.bool,
	isHolidaysDisabled: PropTypes.bool,
	isHoursDisabled: PropTypes.bool
} 

DateTimePicker.defaultProps = {
	format: "MM/dd/yyyy HH:mm",
	label: "Select due date",
	showTodayButton: true,
	isWeekendsDisabled: false,
	isHolidaysDisabled: false,
	isHoursDisabled:false,
}

export default DateTimePicker;
