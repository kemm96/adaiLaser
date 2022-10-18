import React, { forwardRef, useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { Button, Dialog, Slide, IconButton, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, Divider } from '@mui/material'
import { Close, Save, Edit, Email } from '@mui/icons-material'
import { BoxShadow } from '../../styles/styles'
import { validaciones } from '../../utils'
import { ClientContext } from '../../context/ClientContext'
import ClientsService from '../../services/clientsService'
import { clientError, generos, initialClient } from '../../utils/lists'

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
const FormContainer = styled.div`
	border: 1px solid #e0e0e0;
	height:90%;
	width:90%;
	display:flex;
	flex-direction:column;
`
const Form = styled.div`
	height:100%;
	overflow-y:auto;
`
const LittleBar = styled.div`
	padding:.5rem 1.5rem;
	font-size:1.1rem;
	& span {
		margin-left:2rem;
		font-size:.8rem;
	}
`
const Inputs = styled.div`
	padding:0 1rem;
	display:flex;
	flex-wrap:wrap;
	& > div{
		min-width:20rem;
		margin:.5rem;
		flex:1;
	}
`
const Footer = styled.div`
	display:flex;
	padding:.5rem;
	justify-content:flex-end;
	align-items:center;
	border-top: 1px solid #e0e0e0;
	button{
		color:#1976D2;
		:hover{
			background-color:#1976D233;
		}
	}
`
/****** ******************** *****/

const transition = forwardRef((props, ref) => {
	return <Slide direction='up' ref={ref} {...props} />;
});

const DialogClientComponent = (props) => {
	const { cliente, edit, setEdit, render, setRender } = useContext(ClientContext);

	const [data, setData] = useState(cliente);
	const [error, setError]= useState(clientError);
	
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
	
  	const handleClose = () => {
		setEdit(false);
		setError(false);
    	props.handleClose();
  	};

	const handleEdit = () => {
		setEdit(!edit)
	}

	const handleSend = async() => {
		for (const i in error){
			if(error[i]){
				alert('Arregla los errores antes de guardar')
				return
			}
		}
		
		if(data.rut === ''){
			alert('EL R.U.T es obligatorio')
		}else{
			await ClientsService.post(data)
			.then(
				res => {
					setData(initialClient);
					setRender(!render);
					handleClose();
				}
			).catch(
				err => {
					console.log(err);
				}
			)
		}
	}

	useEffect(() => {
		setData(cliente);
	}, [cliente]);

	return (
		<Dialog
			fullScreen
			open={props.open}
			onClose={handleClose}
			TransitionComponent={transition}
		>
			<Bar>
				<span>{'PESTAÑA DE CLIENTE'}</span>
				<IconButton onClick={handleClose} title='Cerrar'><Close/></IconButton>
			</Bar>
			<BodyContainer>
				<FormContainer>
					<Form>
						<LittleBar>PERFIL <span>(*) Campo Obligatorio</span></LittleBar>
						<Divider/>
						<br/>
						<Inputs>
							<TextField
								disabled={!edit}
								id='name' 
								name='name'
								label='Nombres'
								value={data.name}
								onChange={onChangeInput}
								inputProps={{ maxLength: 50 }}
								error={error.name}
								helperText={error.name ? 'Ingresa un nombre válido' : null}
							/>
							<TextField
								disabled={!edit}
								id='lastName' 
								name='lastName'
								label='Apellidos'
								value={data.lastName}
								onChange={onChangeInput}
								inputProps={{ maxLength: 50 }}
								error={error.lastName}
								helperText={error.lastName ? 'Ingresa un apellido válido' : null}
							/>
							<TextField
								disabled={!edit}
								id='rut' 
								name='rut'
								label='R.U.T. (*)'
								value={data.rut}
								onChange={onChangeInput}
								inputProps={{ maxLength: 10 }}
								error={error.rut}
								helperText={error.rut ? 'Ingresa un formato válido' : 'Ingresar Sin puntos y con guión'}
							/>
						</Inputs>
						<Inputs>
						<TextField
								disabled={!edit}
								id='birthday' 
								name='birthday'
								label='Fecha de Nacimiento *'
								type='date'
								value={data.birthday}
								onChange={onChangeInput}
								InputLabelProps={{
									shrink: true,
								}}
								error={error.birthday}
								helperText={error.birthday ? 'Ingresa una fecha válido' : null}
							/>
							<FormControl>
								<InputLabel id='labelGender'>Género</InputLabel>
								<Select
									disabled={!edit}
									labelId='labelGender'
									id='gender'
									name='gender'
									label='Género'
									value={data.gender}
									onChange={onChangeInput}
								>
									{
										generos.map((opcion, i) => (
											<MenuItem key={i} value={opcion.id}>{opcion.name}</MenuItem>
										))
									}
								</Select>
							</FormControl>
						</Inputs>
						<br/>
						<Divider/>
						<LittleBar>DOMICILIO</LittleBar>
						<Divider/>
						<br/>
						<Inputs>
							<TextField
								disabled={!edit}
								id='adress' 
								name='adress'
								label='Dirección'
								value={data.adress}
								onChange={onChangeInput}
								error={error.adress}
								helperText={error.adress ? 'Ingresa una dirección válida' : null}
							/>
							<TextField
								disabled={!edit}
								id='comuna' 
								name='comuna'
								label='Comuna'
								value={data.comuna}
								onChange={onChangeInput}
								error={error.comuna}
								helperText={error.comuna ? 'Ingresa una comuna válida' : null}
							/>
						</Inputs>
						<br/>
						<Divider/>
						<LittleBar>CONTACTO</LittleBar>
						<Divider/>
						<br/>
						<Inputs>
							<TextField
								disabled={!edit}
								id='mail' 
								name='mail'
								label='Email'
								value={data.mail}
								onChange={onChangeInput}
								InputProps={{
									startAdornment: <InputAdornment position='start'><Email/></InputAdornment>,
								}}
								error={error.mail}
								helperText={error.mail ? 'Ingresa un mail válido' : null}
							/>
							<TextField
								disabled={!edit}
								id='phone' 
								name='phone'
								label='Teléfono'
								value={data.phone}
								onChange={onChangeInput}
								InputProps={{
									startAdornment: <InputAdornment position='start'>+56</InputAdornment>,
								}}
								inputProps={{ 
									maxLength: 9,
									inputMode: 'numeric',
								}}
								error={error.phone}
								helperText={error.phone ? 'Ingresa un número de teléfono válido' : null}
							/>
						</Inputs>
					</Form>
					<Footer>
						{data.id !== null && !edit ? (
							<Button title='Editar Cliente' onClick={handleEdit} startIcon={<Edit/>}>Editar</Button>
						): null}
						{data.id !== null && edit ? (
							<Button title='Cancelar' onClick={handleEdit} startIcon={<Close/>}>Cancelar</Button>
						): null}
						{edit ? (
							<Button title='Guardar Cliente' onClick={handleSend} startIcon={<Save/>}>Guardar</Button>
						): null}
					</Footer>
				</FormContainer>
			</BodyContainer>
		</Dialog>
	)
}

export default DialogClientComponent