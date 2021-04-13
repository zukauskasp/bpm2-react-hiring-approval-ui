import React from "react";
import './TextField.scss';
import PropTypes from 'prop-types';
import Tooltip from "../Tooltip/Tooltip";

const TextField = ({ textarea, readonly, name, label, required, type, value, placeholder, onChange, rows, errorMessage, ...otherProps }) => {

    if (textarea) {
        return (
            <div className="form-group">
                <label className={`${readonly ? 'readOnlyLabel' : null}`} htmlFor={name}>{label} {required ? " *" : null}</label>
                <textarea type={type} name={name} className={`textArea ${readonly ? 'readOnly' : null}`} value={value} placeholder={placeholder} onChange={onChange} rows={rows} readOnly={readonly} {...otherProps} />
                {errorMessage ? <Tooltip text={errorMessage} messageType='error' /> : null}
            </div>
        );
    } else {
        return (
            <div className="form-group">
                {label ? <label className={`${readonly ? 'readOnlyLabel' : null}`} htmlFor={name}>{label} {required ? " *" : null}</label> : null}
                <input type={type} name={name} className={`form-control  ${readonly ? 'readOnly' : null}`} value={value} placeholder={placeholder} onChange={onChange} readOnly={readonly} {...otherProps} />
                {errorMessage ? <Tooltip text={errorMessage} messageType='error' /> : null}
            </div>
        );
    }
}

TextField.propTypes = {
    errorMessage: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    required: PropTypes.bool,
    readonly: PropTypes.bool,
    textarea: PropTypes.bool,
    name: PropTypes.string,
    type: PropTypes.oneOf(['text', 'number', 'password', 'time']),
    value: PropTypes.string,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
}

TextField.defaultProps = {
    errorMessage: "",
    label: "",
    rows: 3,
    type: "text"
}

export default TextField;