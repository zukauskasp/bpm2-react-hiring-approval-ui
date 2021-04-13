import React, { useState, useEffect } from "react";
import './button.scss';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Icon from "../Icon/Icon";

const Button = ({ icon, buttonType, background, text, onClickEvent }) => {

    const classes = useStyles();
    const [iconColor, setIconColor] = useState(null)


    useEffect(() => {
        if (icon) setIconColor(buttonType === "secondary" && background === "light" ? 'dark' : 'white');
    }, [icon, buttonType, background]);

    return (
        <div
            onClick={onClickEvent}
            className={
                `customButton
                 ${buttonType === 'secondary' ? classes.customSecondaryButton : ""}
                 ${buttonType === 'primary' ? classes.customPrimaryButton : ""}
                 ${background === 'dark' && buttonType === 'secondary' ? classes.customSecondaryButtonDarkBg : ""}
                 ${icon ? classes.buttonWithIcon : ""}
                 ${!text ? classes.roundButton : ""}
                 `
            }
        >
            {text}
            {icon ? <Icon color={iconColor} icon={icon} className={`basicIcon ${text ? classes.textIcon : ""} `} /> : null}
        </div>
    );

}

Button.propTypes = {
    icon: PropTypes.oneOf(['add', 'remove', 'search', 'next', 'expand']),
    buttonType: PropTypes.oneOf(['primary', 'secondary']),
    background: PropTypes.oneOf(['light', 'dark']),
    text: PropTypes.string,
    onClickEvent: PropTypes.func.isRequired,
}

Button.defaultProps = {
    buttonType: "primary",
    background: "light",
    text: ""
}

export default Button;

const useStyles = makeStyles({
    customPrimaryButton: {
        background: '#009FDA',
        color: '#fff',
        '&:hover': {
            background: '#0283b4',
        },
    },
    customSecondaryButton: {
        background: 'rgba(197, 200, 203, 0.1)',
        border: '0.5px solid rgba(197, 200, 203, 0.5)',
        color: '#003755',
        '&:hover': {
            background: 'rgba(197, 200, 203, 0.3)'
        },
    },
    customSecondaryButtonDarkBg: {
        background: 'rgba(197, 200, 203, 0)',
        color: '#fff',
        border: '0.5px solid rgba(255, 255, 255, 0.3)',
        '&:hover': {
            background: 'rgba(197, 200, 203, 0.2)'
        },
    },
    buttonWithIcon: {
        padding: '0 24px 0 32px',
    },
    textIcon: {
        marginLeft: '16px',

    },
    roundButton: {
        borderRadius: '50%',
        color: '#fff',
        width: '48px',
        minWidth: '0',
        padding: 0,
        height: '48px',
        background: '#003755',
        '&:hover': {
            background: 'rgba(0,55,85,.9)'
        }
    }
});