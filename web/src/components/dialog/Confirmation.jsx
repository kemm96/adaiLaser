import React from 'react'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material/'
import { Done, Close } from '@mui/icons-material'

const ConfirmationComponent = (props) => {

  	const handleClose = () => {
    	props.onClose();
  	}

	const handleConfirmation = () => {
		props.confirmation();
		props.onClose();
	}

	return (
		<Dialog
			open={props.open}
			onClose={handleClose}
		>
		<DialogTitle>
			{`¿Seguro que desea ${props.text}?`}
		</DialogTitle>
		<DialogActions>
			<Button title='No' onClick={handleClose} startIcon={<Close/>}>No</Button>
			<Button title='Si' onClick={handleConfirmation} startIcon={<Done/>} autoFocus>Si</Button>
		</DialogActions>
		</Dialog>
	);
}

export default ConfirmationComponent