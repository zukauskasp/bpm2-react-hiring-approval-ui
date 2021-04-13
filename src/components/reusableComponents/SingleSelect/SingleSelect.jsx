import React, { useState } from "react";
import "./singleSelect.scss";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Tooltip from "../Tooltip/Tooltip";
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const SingleSelect = ({ label, required, value, onChange, items, errorMessage, ...otherProps }) => {

    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const handleSelectArrows = () => setIsOpen(!isOpen);

    return (
        <FormControl className={`${classes.formWrapper} formWrapper`}>
            {label ? <label className={classes.label}>{label} {required ? " *" : null}</label> : null}
            <NativeSelect
                {...otherProps}
                value={value}
                onChange={onChange}
                onClick={handleSelectArrows}
                input={<BootstrapInput />}
                IconComponent={isOpen ? KeyboardArrowUpIcon : KeyboardArrowDownIcon}>
                {items ? items.map((option, index) => (
                    <option value={option.value} key={index}> {option.name}</option>
                )) : null}
            </NativeSelect>
            {errorMessage ? <Tooltip text={errorMessage} messageType='error' /> : null}
        </FormControl>
    );
}


SingleSelect.propTypes = {
    errorMessage: PropTypes.string,
    required: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.exact({
        name: PropTypes.string,
        value: PropTypes.string
    })).isRequired,
    value: PropTypes.string,
}

SingleSelect.defaultProps = {
    errorMessage: "",
    label: ""
}


export default SingleSelect;

const BootstrapInput = withStyles(theme => ({
    root: {
        width: '280px',
    },
    input: {
        borderRadius: 4,
        color: '#495057',
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: '16px',
        height: '48px',
        lineHeight: "48px",
        padding: '0 .75rem',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        boxSizing: "border-box",
        fontFamily: "Danske Text v2",
        '&:focus': {
            borderColor: 'rgb(0, 159, 218)',
            outline: 'none',
            borderRadius: 4
        },
    },
}))(InputBase);

const useStyles = makeStyles({
    formWrapper: {
        marginBottom: "24px"
    },
    label: {
        marginBottom: '8px',
        fontFamily: 'Danske Text v2',
        color: "#003755",
    }
});
