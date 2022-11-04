import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { DialogBar, FlexContainer } from '../../styles/styles'
import { Dialog, Slide, IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'

/***** Component style *****/
const BodyContainer = styled(FlexContainer)`
	height:100%;
	width:100%;
`
/****** ******************** *****/

const transition = forwardRef((props, ref) => {
	return <Slide direction='up' ref={ref} {...props} />;
});

const DialogNewEventComponent = (props) => {
	
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
			<DialogBar>
				<span>{``}</span>
				<IconButton onClick={handleClose} title='Cerrar'><Close/></IconButton>
			</DialogBar>
			<BodyContainer>
				
			</BodyContainer>
		</Dialog>
	)
}

export default DialogNewEventComponent