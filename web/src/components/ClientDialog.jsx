import React, { forwardRef} from 'react'
import styled from 'styled-components'
import { Button, Dialog, Slide, IconButton, TextField, InputAdornment, FormControl, InputLabel, FormHelperText, Select, MenuItem, Divider} from '@mui/material';
import { Close, Save, Edit, Email } from '@mui/icons-material'
import { BoxShadow } from '../styles/styles'
import { generos } from '../utils';

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
		min-width:10rem;
		margin:.5rem;
		flex:1;
	}
`
const Footer = styled.div`
	display:flex;
	padding:.5rem;
	justify-content:flex-end;
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

const ClientDialog = (props) => {
	const onChangeInput = (e) => {
      const {name, value} = e.target;
		props.updateCliente(name, value);
   }
	
  	const handleCloseClient = () => {
    	props.handleCloseClient();
  	};

	const handleSendClient = () => {
		props.handleSendClient();
	};

	const handleEditClient = () => {
		props.handleEditClient()
	}

	return (
		<React.Fragment>
			<Dialog
				fullScreen
				open={props.open}
				onClose={handleCloseClient}
				TransitionComponent={transition}
			>
				<Bar>
					<span>{props.newClient ? 'AGREGAR NUEVO CLIENTE' : 'CLIENTE'}</span>
					<IconButton onClick={handleCloseClient} title='Cerrar'><Close/></IconButton>
				</Bar>
				<BodyContainer>
					<FormContainer>
						<Form>
							<LittleBar>PERFIL <span>(*) Campos Obligatorios</span></LittleBar>
							<Divider/>
							<br/>
							<Inputs>
								<FormControl>
									<TextField
										disabled={!props.newClient}
										id='name' 
										name='name'
										label='Nombres *'
										value={props.data.name}
										onChange={onChangeInput}
										inputProps={{ maxLength: 50 }}
									/>
									{props.error ? <FormHelperText error>Debes llenar los campos obligatorios</FormHelperText> : null}
								</FormControl>
								<FormControl>
									<TextField
										disabled={!props.newClient}
										id='lastName' 
										name='lastName'
										label='Apellidos *'
										value={props.data.lastName}
										onChange={onChangeInput}
										inputProps={{ maxLength: 50 }}
									/>
									{props.error ? <FormHelperText error>Debes llenar los campos obligatorios</FormHelperText> : null}
								</FormControl>
								<FormControl>
									<TextField
										disabled={!props.newClient}
										id='rut' 
										name='rut'
										label='R.U.T. *'
										value={props.data.rut}
										onChange={onChangeInput}
									/>
									{props.error ? <FormHelperText error>Debes llenar los campos obligatorios</FormHelperText> : null}
								</FormControl>
							</Inputs>
							<Inputs>
								<FormControl>
									<TextField
										disabled={!props.newClient}
										id='birthday' 
										name='birthday'
										label='Fecha de Nacimiento *'
										type='date'
										value={props.data.birthday}
										onChange={onChangeInput}
										InputLabelProps={{
											shrink: true,
										 }}
									/>
									{props.error ? <FormHelperText error>Debes llenar los campos obligatorios</FormHelperText> : null}
								</FormControl>
								<FormControl>
									<TextField
										disabled
										id='age' 
										name='age'
										label='Edad'
										value={props.data.age}
									/>
								</FormControl>
								<FormControl>
									<InputLabel id='labelGender'>Género *</InputLabel>
									<Select
										disabled={!props.newClient}
										labelId='labelGender'
										id='gender'
										name='gender'
										label='Género *'
										value={props.data.gender}
										onChange={onChangeInput}
									>
										{
											generos.map((opcion, i) => (
												<MenuItem key={i} value={opcion.id}>{opcion.name}</MenuItem>
											))
										}
									</Select>
									{props.error ? <FormHelperText error>Debes llenar los campos obligatorios</FormHelperText> : null}
								</FormControl>
							</Inputs>
							<br/>
							<Divider/>
							<LittleBar>CONTACTO</LittleBar>
							<Divider/>
							<br/>
							<Inputs>
								<TextField
									disabled={!props.newClient && !props.edit}
									id='mail' 
									name='mail'
									label='Email'
									value={props.data.mail}
									onChange={onChangeInput}
									InputProps={{
										startAdornment: <InputAdornment position='start'><Email/></InputAdornment>,
									}}
								/>
								<TextField
									disabled={!props.newClient && !props.edit}
									id='phone' 
									name='phone'
									label='Telefono'
									value={props.data.phone}
									onChange={onChangeInput}
									InputProps={{
										startAdornment: <InputAdornment position='start'>+56</InputAdornment>,
									}}
								/>
							</Inputs>
						</Form>
						<Footer>
							{!props.newClient && !props.edit? (
								<Button title='Editar Cliente' onClick={handleEditClient} startIcon={<Edit/>}>Editar</Button>
							): null}
							{!props.newClient && props.edit ? (
								<Button title='Cancelar' onClick={handleEditClient} startIcon={<Close/>}>Cancelar</Button>
							): null}
							{props.newClient || props.edit ? (
								<Button title='Guardar Cliente' onClick={handleSendClient} startIcon={<Save/>}>Guardar</Button>
							): null}
						</Footer>
					</FormContainer>
				</BodyContainer>
			</Dialog>
		</React.Fragment>
	)
}

export default ClientDialog