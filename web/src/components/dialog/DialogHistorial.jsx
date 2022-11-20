import React, { forwardRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { DialogBar, FlexContainer } from '../../styles/styles'
import { Dialog, Slide, IconButton, CircularProgress } from '@mui/material'
import { Close } from '@mui/icons-material'
import ClientsService from '../../services/clientsService'

/***** Component style *****/
const BodyContainer = styled(FlexContainer)`
	height:100%;
	width:100%;
`
const FormContainer = styled.div`
	border: 1px solid #e0e0e0;
	height:90%;
	width:90%;
	display:flex;
	flex-direction:column;
	align-items:center;
	overflow-y: auto;
`
const CitaContainer = styled.div`
	border-bottom: 1px solid #e0e0e0;
	width:90%;
	padding:1.5rem;
	display:flex;		
	& div{
		display:flex;
		flex-direction:column;
		width:50%;
	}
`
const LoadingContainer = styled(FlexContainer)`
	width:100%;
	height:100%;
`
/****** ******************** *****/

const transition = forwardRef((props, ref) => {
	return <Slide direction='up' ref={ref} {...props} />;
});

const DialogHistorialComponent = (props) => {
	
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

  	const handleClose = () => {
    	props.handleClose();
		 setData([]);
  	};

	const get = async() => {
		setLoading(true)
		await ClientsService.history(props.client.id)
		.then(
			res => {
				setData(res);
				setLoading(false)
			}
		).catch(
			err => {
				setData([]);
				console.log(err);
			}
		);
	}

	useEffect(() => {
		get();
	}, [props.client]);

	return (
		<Dialog
			fullScreen
			open={props.open}
			onClose={handleClose}
			TransitionComponent={transition}
		>
			<DialogBar>
				<span>{`Historial de ${props.client.name}`}</span>
				<IconButton onClick={handleClose} title='Cerrar'><Close/></IconButton>
			</DialogBar>
			<BodyContainer>
				<FormContainer>
					{loading  ? (
						<LoadingContainer>
							<CircularProgress/>
						</LoadingContainer>
					) : (
						<React.Fragment>
							{data.map((aux, i) => (
								<CitaContainer key={i}>
									<div>
										<span>Kinesióloga: {aux.name}</span>
										<span>Tratamiento: {aux.tratamiento}</span>
										<span>Box: {aux.box}</span>
									</div>
									<div>
										<span>Fecha: {aux.date}</span>
										<span>Desde: {aux.time1}</span>
										<span>Hasta: {aux.time2}</span>
									</div>
								</CitaContainer>
							))}
						</React.Fragment>
					)}
				</FormContainer>
			</BodyContainer>
		</Dialog>
	)
}

export default DialogHistorialComponent