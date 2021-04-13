import React from "react";
import './Tooltip.scss';
import PropTypes from 'prop-types';

const Message = ({ messageType, text, position, ...otherPorps }) => {
    return <div className={`tooltip tooltip-${messageType} tooltip-${position}`} {...otherPorps}>{text} </div>
}

Message.propTypes = {
    messageType: PropTypes.oneOf(["error", "success", "default"]),
    position: PropTypes.oneOf(["bottom-left", "bottom", "bottom-right", "left", "top-left", "top", "top-right", "right"]),
    text: PropTypes.string,
}

Message.defaultProps = {
    messageType: "default",
    text: "",
    position: "top-left"
}

export default Message;