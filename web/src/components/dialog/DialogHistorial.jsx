import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { Dialog, Slide, IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'
import { FullDialogBar, FlexCenterContainer } from '../../styles/styles'

/***** Component style *****/

/****** ******************** *****/

const transition = forwardRef((props, ref) => {
	return <Slide direction='up' ref={ref} {...props} />;
});

const DialogHistorialComponent = (props) => {
	
  	const handleClose = () => {
    	props.handleClose();
  	};

	return (
		<Dialog
			fullScreen
			open={props.open}
			onClose={handleClose}
			TransitionComponent={transition}
		>
			<FullDialogBar>
				<span>{`Historial de `}</span>
				<IconButton onClick={handleClose} title='Cerrar'><Close/></IconButton>
			</FullDialogBar>
			<FlexCenterContainer>
				
			</FlexCenterContainer>
		</Dialog>
	)
}

export default DialogHistorialComponent