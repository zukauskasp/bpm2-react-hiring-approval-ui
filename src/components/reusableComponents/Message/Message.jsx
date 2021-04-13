import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Message.scss';
import Icon from "../Icon/Icon";

const Message = ({ type, text, onClick }) => {

    const [icon, setIcon] = useState("");

    useEffect(() => {
        if (type !== 'default') setIcon(returnIconByName(type));
    }, [type]);

    return (
        <div className={`notification-wrapper ${type}-message`}>
            {icon ? <Icon icon={icon} color="white" className={`icon grid-item-first`} /> : null}
            <span className={`grid-item-second`}>{text}</span>
            <Icon icon="remove" color="white" onClick={onClick} className={`icon icon-remove grid-item-third `} />
        </div>
    );
}


export const returnIconByName = (messageType) => {
    let iconName;
    switch (messageType) {
        case "error":
            iconName = 'removeInCircle'
            break;
        case "warning":
            iconName = 'alert';
            break;
        case "success":
            iconName = 'check'
            break;
        case "info":
            iconName = "info"
            break;
        default:
            return "";
    }

    return iconName;

}

Message.propTypes = {
    type: PropTypes.oneOf(['error', 'warning', 'success', 'info', 'default']),
    text: PropTypes.string,
    onClick: PropTypes.func,
}

Message.defaultProps = {
    type: "default",
    text: ""
}

export default Message;