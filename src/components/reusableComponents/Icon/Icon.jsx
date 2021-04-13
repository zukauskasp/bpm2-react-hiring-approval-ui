import React from "react";
import PropTypes from "prop-types";

const Icon = ({ icon, color, ...otherProps }) => {

    return (
        <img alt="" src={process.env.PUBLIC_URL + '/assets/icons/' + icon + '/' + color + '.svg'} {...otherProps} />
    )
}

Icon.propTypes = {
    icon: PropTypes.oneOf(['add', 'alert', 'back', 'check',
        'collapse', 'duplicate', 'edit', 'expand', 'info', 'next',
        'remove', 'removeInCircle', 'search', 'trash', 'upload'
    ]),
    color: PropTypes.oneOf(['white', 'dark']),
    otherProps: PropTypes.any,
}

Icon.defaultProps = {
    color: "dark"
}


export default Icon;