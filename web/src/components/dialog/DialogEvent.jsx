import React, { forwardRef, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { DialogBar, FlexContainer } from '../../styles/styles'
import { Dialog, Slide, IconButton, TextField, InputLabel, Select, FormControl, MenuItem } from '@mui/material'
import { Close } from '@mui/icons-material'
import { CalendarContext } from '../../context/CalendarContext'
import CalendarService from '../../services/calendarService'
import { getTokenData, validaciones } from '../../utils'
import dayjs from 'dayjs'
import { eventError } from '../../utils/lists'

/***** Component style *****/
const Container = styled.div`
	height:80vh;
	width:100%;
`
const BodyContainer = styled(FlexContainer)`
	height:72vh;
	width:100%;
`
const FormContainer = styled(FlexContainer)`
	border: 1px solid #e0e0e0;
	height:90%;
	width:90%;
`
const Form = styled.div`
	height:90%;
	width:90%;
	overflow-y:auto;
`
const Inputs = styled.div`
	padding:0 1rem;
	display:flex;
	& > div{
		width:100%;
		margin:.5rem;
		flex:1;
	}
`
/****** ******************** *****/

const transition = forwardRef((props, ref) => {
	return <Slide direction='up' ref={ref} {...props} />;
});

const DialogEventComponent = (props) => {
	
	const { event } = useContext(CalendarContext);

	const [data, setData] = useState(event);
	const [error, setError]= useState(eventError);
	const [disabled, setDisabled] = useState(false);
	const [selectList, setSelectList] = useState({
		tratamientos:[],
		user:[],
		box:[],
	});
	
	const handleClose = () => {
    	props.handleClose();
  	};

	const onChangeInput = (e) => {
      const {name, value} = e.target;
		
		if(!validaciones(name,value)){
			setError({
				...error,
				[name]: true,
			});
		}else{
			setError({
				...error,
				[name]: false,
			});
		}

		setData({
			...data,
			[name]: value,
		});
   }

	const get = async() => {
		await CalendarService.selectList()
		.then(
			res => {
				setSelectList(res);
			}
		).catch(
			err => {
				setSelectList([]);
				console.log(err);
			}
		)

		const tokenData = getTokenData();
		if(tokenData.user.rol === 2){
			setData({
				...data,
				['user']: tokenData.user.id,
				['date']: dayjs(new Date()).format('YYYY-MM-DD'),
			});
			setDisabled(true);
		}else{
			setData({
				...data,
				['date']: dayjs(new Date()).format('YYYY-MM-DD'),
			});
		}
	}

	useEffect(() => {
		get();
	}, []);

	return (
		<Dialog
			fullWidth
			open={props.open}
			onClose={handleClose}
			TransitionComponent={transition}
		>
			<Container>
				<DialogBar>
					<span>{data.id === null ? 'NUEVA RESERVA' : ''}</span>
					<IconButton onClick={handleClose} title='Cerrar'><Close/></IconButton>
				</DialogBar>
				<BodyContainer>
					<FormContainer>
						<Form>
							<Inputs>
								<FormControl fullWidth>
									<InputLabel id={props.name+'-userLabel'}>Kinesióloga</InputLabel>
									<Select
										disabled={disabled}
										labelId={props.name+'-userLabel'}
										id={props.name+'-user'}
										name='user'
										label='Kinesióloga'
										value={data.user === null ? '' : data.user}
										onChange={onChangeInput}
									>
										{
											selectList.user.map((opcion, i) => (
												<MenuItem key={i} value={opcion.id}>{opcion.name}</MenuItem>
											))
										}
									</Select>
								</FormControl>
							</Inputs>
							<Inputs>
								<TextField
									id='client' 
									name='client'
									label='Cliente'
								/>
							</Inputs>
							<Inputs>
								<FormControl fullWidth>
									<InputLabel id={props.name+'-tratamientoLabel'}>Tratamiento</InputLabel>
									<Select
										labelId={props.name+'-tratamientoLabel'}
										id={props.name+'-tratamiento'}
										name='tratamiento'
										label='Tratamiento'
										value={data.tratamiento === null ? '' : data.tratamiento}
										onChange={onChangeInput}
									>
										{
											selectList.tratamientos.map((opcion, i) => (
												<MenuItem key={i} value={opcion.id}>{opcion.name}</MenuItem>
											))
										}
									</Select>
								</FormControl>
								<FormControl fullWidth>
									<InputLabel id={props.name+'-boxLabel'}>Box</InputLabel>
									<Select
										labelId={props.name+'-boxLabel'}
										id={props.name+'-box'}
										name='box'
										label='Box'
										value={data.box === null ? '' : data.box}
										onChange={onChangeInput}
									>
										{
											selectList.box.map((opcion, i) => (
												<MenuItem key={i} value={opcion.id}>{opcion.name}</MenuItem>
											))
										}
									</Select>
								</FormControl>
							</Inputs>
							<Inputs>
								<TextField
									id='date' 
									name='date'
									label='Fecha'
									type='date'
									value={data.date === null ? '' : data.date}
									onChange={onChangeInput}
									InputLabelProps={{
										shrink: true,
									}}
									error={error.date}
									helperText={error.date ? 'Ingresa una fecha válida' : null}
								/>
							</Inputs>
							<Inputs>
								<TextField
									id='time1' 
									name='time1'
									label='Desde'
								/>
								<TextField
									id='time2' 
									name='time2'
									label='Hasta'
								/>
							</Inputs>
							<Inputs>
								<TextField
									id='description' 
									name='description'
									label='Comentarios'
								/>
							</Inputs>
						</Form>
					</FormContainer>
				</BodyContainer>
			</Container>
		</Dialog>
	)
}

export default DialogEventComponent