import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import CustomButton from '../Button/Button';
import Icon from "../Icon/Icon";

import './modal.scss';

const Modal = ({children,title,onClose,open,submitButtonText,onSubmit } ) => {
    const classes = useStyles();

	return (
		<Dialog onClose={onClose} open={open} maxWidth={false}>
			<div className="modal-container">
				<div className='close-container'>
					<Icon icon="remove" onClick={onClose} className='close-icon' />
				</div>
				<DialogTitle disableTypography={true} className={classes.title}>{title}</DialogTitle>
				<DialogContent className={classes.content}>

					<div className="modal-content-container">
						{children}
					</div>

					<div className="modal-buttons-container">
						<CustomButton
							text="Cancel"
							buttonType="secondary"
							onClickEvent={onClose}
						/>
						<CustomButton
							text={submitButtonText}
							buttonType="primary"
							onClickEvent={onSubmit}
						/>
					</div>
				</DialogContent>
			</div>
		</Dialog>
    )
}

const useStyles = makeStyles({
	title: {
		textAlign: 'center',
		fontSize: '36px',
		fontWeight: '500',
		paddingTop: '40px;',
		fontFamily: "Danske Human Medium Italic, Danske Human",
		color: '#003755'
	},
	content: {
		paddingTop: '20px',
	}
});

Modal.propTypes = {
	onClose: PropTypes.func.isRequired,
	submitButtonText: PropTypes.string,
	open: PropTypes.bool,
	title: PropTypes.string,
	onSubmit: PropTypes.func.isRequired,
}

Modal.defaultProps = {
	submitButtonText: 'Submit',
	open: false,
}

export default Modal;