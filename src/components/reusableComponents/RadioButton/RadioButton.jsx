import React from "react";
import Tooltip from "../Tooltip/Tooltip";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const RadioButton = ({ label, items, onChange, selectedItem, errorMessage }) => {

    const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
            {label ? <FormLabel className={classes.customLabel}>{label}</FormLabel> : null}
            <RadioGroup  >
                {items && items.map((option, index) => (
                    <FormControlLabel
                        key={index} value={option.value}
                        control={<StyledRadio />}
                        label={option.name}
                        disabled={!!option.disabled ? true : false}
                        className={`${classes.customLabel} ${classes.radioLabel}`}
                        onChange={onChange}
                        checked={selectedItem && selectedItem === option.value ? true : false}
                    />
                ))}
            </RadioGroup>
            {errorMessage ? <Tooltip text={errorMessage} messageType='error' /> : null}
        </FormControl>
    );

}

RadioButton.propTypes = {
    errorMessage: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.string,
        disabled: PropTypes.bool
    })).isRequired,
    selectedItem: PropTypes.string.isRequired
}

RadioButton.defaultProps = {
    errorMessage: "",
    label: ""
}


export default RadioButton;

const useStyles = makeStyles(theme => ({
    formControl: {
        marginTop: '24px'
    },
    customLabel: {
        fontFamily: 'Danske Text v2',
        color: "#003755",
        marginBottom: "8px"
    },
    radioLabel: {
        marginBottom: 0
    }
}));

function StyledRadio(props) {
    const classes = useStyles2();

    return (
        <Radio
            className={classes.root}

            color="default"
            checkedIcon={<span className={` ${classes.checkedIcon}`} />}
            icon={<span className={classes.icon} />}
            {...props}
            disableRipple
        />
    );
}

const useStyles2 = makeStyles({
    root: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    icon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        border: '1px solid rgb(0, 159, 218)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
            border: '1px solid rgb(206,217,224)'
        },
    },
    checkedIcon: {
        backgroundColor: 'rgb(0, 159, 218)',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        borderRadius: '50%',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: 'rgb(0, 159, 218)',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
            border: '1px solid rgb(206,217,224)'
        },
    }
});
