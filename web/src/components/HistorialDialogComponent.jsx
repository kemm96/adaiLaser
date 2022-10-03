import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { Dialog, Slide, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material'
import { BoxShadow } from '../styles/styles'

/***** Component style *****/
const Bar = styled(BoxShadow)`
	height:6vh;
	align-items:center;
	justify-content:space-between;
	padding: 0 5%;
	background-color:#1976D2;
	& button{
		color:#ffffff;
		transform:scale(1.2);
		:hover{
			background-color:#ffffff33;
		}
	}
	& span{
		color:#ffffff;
		font-size:1.5rem;
	}
`
const BodyContainer = styled.div`
	display:flex;
	justify-content:center;
	align-items:center;
	height:100%;
`
/****** ******************** *****/

const transition = forwardRef((props, ref) => {
	return <Slide direction='up' ref={ref} {...props} />;
});

const HistorialDialogComponent = (props) => {
	
  	const handleClose = () => {
    	props.handleClose();
  	};

	return (
		<React.Fragment>
			<Dialog
				fullScreen
				open={props.open}
				onClose={handleClose}
				TransitionComponent={transition}
			>
				<Bar>
					<span>{`Historial de `}</span>
					<IconButton onClick={handleClose} title='Cerrar'><Close/></IconButton>
				</Bar>
				<BodyContainer>
					
				</BodyContainer>
			</Dialog>
		</React.Fragment>
	)
}

export default HistorialDialogComponent