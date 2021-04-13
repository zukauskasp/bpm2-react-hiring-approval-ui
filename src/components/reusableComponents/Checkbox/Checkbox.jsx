import React from "react";
import PropTypes from 'prop-types';
import Tooltip from "../Tooltip/Tooltip";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const CustomCheckbox = ({ readonly, value, onChange, label, errorMessage }) => {

    const classes = useStyles();
    return (
        <div>
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox
                            className={!!readonly ? classes.customDisabledCheckbox : classes.customPrimaryCheckbox}
                            checked={value}
                            onChange={onChange}
                            value={value}
                            disabled={readonly}
                        />
                    }
                    label={
                        <Typography component="p" className={classes.customLabel}>{label}</Typography>
                    }
                    className={classes.margin}
                />
            </FormGroup >
            {errorMessage ? <Tooltip text={errorMessage} messageType='error' /> : null}
        </div >
    );
}

CustomCheckbox.propTypes = {
    readonly: PropTypes.bool,
    value: PropTypes.bool,
    errorMessage: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}

CustomCheckbox.defaultProps = {
    readonly: false,
    value: false,
    errorMessage: "",
    label: ""
}

export default CustomCheckbox;

const useStyles = makeStyles({
    customLabel: {
        fontFamily: 'Danske Text v2',
        color: "#003755",
    },
    customPrimaryCheckbox: {
        color: 'rgb(0, 159, 218)',
        "&.Mui-checked": {
            color: 'rgb(0, 159, 218)',
        },
        '&&:hover': {
            backgroundColor: 'transparent',
        },
    },
    customDisabledCheckbox: {
        color: '#ced4da',
    },
    margin: {
        marginBottom: 0
    }
});