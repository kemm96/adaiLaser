import React, { forwardRef, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { DialogBar, DialogFooter, FlexContainer } from '../../styles/styles'
import { Dialog, Slide, IconButton, TextField, InputLabel, Select, FormControl, MenuItem, Autocomplete, Button } from '@mui/material'
import { Close, Save } from '@mui/icons-material'
import { CalendarContext } from '../../context/CalendarContext'
import CalendarService from '../../services/calendarService'
import { getTokenData, validaciones } from '../../utils'
import dayjs from 'dayjs'
import { eventError, initialEvent } from '../../utils/lists'

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
	flex-direction:column;
`
const Form = styled.div`
	padding-top:1rem;
	height:100%;
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
const Footer = styled(DialogFooter)`
	justify-content:flex-end;
`
/****** ******************** *****/

const transition = forwardRef((props, ref) => {
	return <Slide direction='up' ref={ref} {...props} />;
});

const DialogEventComponent = (props) => {
	
	const { event, render, setRender } = useContext(CalendarContext);

	const [data, setData] = useState(event);
	const [minutes, setMinutes] = useState('');
	const [error, setError]= useState(eventError);
	const [disabledUser, setDisabledUser] = useState(false);
	const [disabledTime, setDisabledTime] = useState(true);
	const [selectList, setSelectList] = useState({
		tratamientos:[],
		user:[],
		box:[],
		client:[],
	});
	const [inputClient, setInputClient] = useState(null);
	
	const handleClose = () => {
		setData(event);
		setInputClient(null)
    	props.handleClose();
  	};

	const handleHour = (time, min) => {
		// desbloquea el tiempo2 si no existen minutos en el tratamiento
		if(min === '' || min === null){
			setDisabledTime(false);
			return ''
		}else{
			setDisabledTime(true);
			// suma los minutos al tiempo1 
			if(time !== '' && time !== null){
				let aux = time.split(':');
				let hora = parseInt(aux[0]);
				let minutos = parseInt(aux[1]);
				let suma = parseInt(min) + minutos;

				hora = hora + Math.trunc(suma/60);
				minutos = suma%60;

				if(Math.trunc(hora/10) < 1){
					hora = '0' + hora;
				}
				if(Math.trunc(minutos/10) < 1){
					minutos = '0' + minutos;
				}
				return (hora + ':' + minutos)
			}
			return ''
		}
	}

	// actuaización input y select
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
		
		// actualiza el tiempo2 si es que existen minutos en el tratamiento
		if(name === 'tratamiento'){
			const found = selectList.tratamientos.find(element => element.id === value);
			setMinutes(found.time)
			setData({
				...data,
				[name]: value,
				['time2']: handleHour(data.time1,found.time),
			});
		}else if(name === 'time1'){
			setData({
				...data,
				[name]: value,
				['time2']: handleHour(value, minutes),
			});
		}else{
			setData({
				...data,
				[name]: value,
			});
		}
   }

	// actualización autocomplete del cliente
	const onChangeClient = (value) => {
		if(value !== null){
			setInputClient(value)
			setData({
				...data,
				['client']: value.id,
			});
		}else{
			setInputClient(value)
			setData({
			...data,
			['client']: '',
		});
		}
	}

	const get = async() => {
		// obtiene las opciones de los select
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
		
		// obtiene la data del token
		const tokenData = getTokenData();
		if(tokenData.user.rol === 2){
			setData({
				...data,
				['user']: tokenData.user.id,
			});
			setDisabledUser(true);
		}
	}

	const handleSend = async() => {
		for (const i in error){
			if(error[i]){
				alert('Arregla los errores antes de guardar')
				return
			}
		}
		for (const i in data){
			if((data[i] === '' || data[i] === null) && i !== 'id'){
				alert('Rellena todos los campos antes de guardar')
				return
			}
		}

		await CalendarService.post(data)
		.then(
			res => {
				setData(initialEvent);
				setInputClient(null)
				setRender(!render);
				handleClose();
			}
		).catch(
			err => {
				console.log(err);
			}
		)
	}

	useEffect(() => {
		get();
	}, []);

	useEffect(() => {
		setData(event);
	}, [event]);

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
										disabled={disabledUser}
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
								<Autocomplete
									id='client'
									value={inputClient}
									options={selectList.client}
									renderInput={(params) => <TextField {...params} label='Cliente' />}
									onChange={(e, value) => {
										onChangeClient(value)
									}}

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
									type='time'
									value={data.time1 === null ? '' : data.time1}
									onChange={onChangeInput}
									InputLabelProps={{
										shrink: true,
									}}
								/>
								<TextField
									disabled={disabledTime}
									id='time2' 
									name='time2'
									label='Hasta'
									type='time'
									value={data.time2 === null ? '' : data.time2}
									onChange={onChangeInput}
									InputLabelProps={{
										shrink: true,
									}}
								/>
							</Inputs>
						</Form>
						<Footer>
							{/* {data.id !== null && !edit ? (
								<Button title='Editar Cliente' onClick={handleEdit} startIcon={<Edit/>}>Editar</Button>
							): null}
							{data.id !== null && edit ? (
								<Button title='Cancelar' onClick={handleEdit} startIcon={<Close/>}>Cancelar</Button>
							): null} */}							
							<Button title='Guardar Cliente' onClick={handleSend} startIcon={<Save/>}>Guardar</Button>
						</Footer>
					</FormContainer>
				</BodyContainer>
			</Container>
		</Dialog>
	)
}

export default DialogEventComponent