import React from "react";
import './multiSelect.scss';
import PropTypes from 'prop-types';
import Tooltip from "../Tooltip/Tooltip";
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import styled from 'styled-components';
import Icon from "../Icon/Icon";


const MultiSelect = ({ errorMessage, label, list, onChange }) => {
    const {
        getRootProps,
        getInputProps,
        getTagProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value,
        focused,
        setAnchorEl,
    } = useAutocomplete({
        defaultValue: [],
        multiple: true,
        options: list,
        onChange: onChange,
        getOptionLabel: option => option.value,
    });
    return (
        <div className="rootElement">
            <div {...getRootProps()} >
                {label ? <label >{label}</label> : null}
                <div ref={setAnchorEl} className={`inputWrapper ${focused ? 'focused' : ''}`} >
                    {value.map((option, index) => (
                        <Tag label={option.name} {...getTagProps({ index })} />
                    ))}
                    <input {...getInputProps()} />
                </div>
            </div>
            {errorMessage ? <Tooltip text={errorMessage} messageType='error' /> : null}
            {groupedOptions.length > 0 ? (
                <div className="listBoxWrapper" >
                    <ul className="listBox" {...getListboxProps()}   >
                        {groupedOptions.map((option, index) => (
                            < li {...getOptionProps({ option, index })} >
                                <span>{option.name}</span>
                                <Icon
                                    icon="remove"
                                    color={value.indexOf(option) > -1 ? "white" : 'dark'}
                                    className="custom-list-icon"
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null
            }
        </div >
    );
}

MultiSelect.propTypes = {
    errorMessage: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    list: PropTypes.arrayOf(PropTypes.exact({
        name: PropTypes.string,
        value: PropTypes.string
    })).isRequired,
}

MultiSelect.defaultProps = {
    errorMessage: "",
    label: ""
}


export default MultiSelect;


const Tag = styled(({ label, onDelete, ...props }) => (
    <div {...props}>
        <span>{label}</span>
        <Icon icon="remove" alt="" onClick={() => onDelete()} style={{ width: '1.2em', margin: '5px' }} />
    </div>
))`
  display: flex;
  align-items: center;
  height: 36px;
  line-height: 30px;
  margin: 6px 3px 0 3px;
  background-color: #C5C8CB;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;
  color: #003755;
  font-size: 12px;

  &:focus {
    border-color: #40a9ff;
    background-color: #e6f7ff;
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`;
