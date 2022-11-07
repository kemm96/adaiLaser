import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { DialogBar, DialogFooter, FlexContainer } from '../../styles/styles';
import { Button, TextField, Drawer, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, InputAdornment } from '@mui/material'
import { Close, Save, Email } from '@mui/icons-material'
import { AdministracionContext } from '../../context/AdministracionContext';
import UserService from '../../services/userService';
import { initialUser, userError } from '../../utils/lists';
import ConfirmationComponent from './Confirmation';
import { validaciones } from '../../utils';

/***** Component style *****/
const BodyContainer = styled(FlexContainer)`
	height:100vh;
	padding:.5rem;
`
const ContentContainer = styled(FlexContainer)`
	flex-direction:column;
	height:94vh;
`
const Content = styled.div`
	margin-top:1rem;
	display:flex;
	flex-direction:column;
	height:100%;
	overflow-y:auto;
`
const Inputs = styled.div`
	display:flex;
	flex-direction:column;
	& .input {
		margin-bottom:1rem;
	}
	& .password{
		margin:1rem 0;
	}
`
const Delete = styled.div`
	margin-bottom:20%;
	& h3{
		color:red;	
	}
`
/****** ******************** *****/

const DialogUsersComponent = (props) => {
	const { user, render, setRender } = useContext(AdministracionContext);

	const [data, setData] = useState(user);
	const [password, setPassword] = useState({
		pass1:'',
		pass2:'',
	});
	const [error, setError]= useState(userError);
	const [deleteConfirmation, setDeleteConfirmation] = useState({
		id:null,
		open:false,
		text:'',
	})

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

	const onChangePassword = (e) => {
      const {name, value} = e.target;

		setPassword({
			...password,
			[name]: value,
		});
   }

  	const handleClose = () => {
		setData(user);
		setPassword({
			pass1:'',
			pass2:'',
		})
		props.handleClose();
	};

	const handleSend = async() => {
		if(data.id === null){	
			for (const i in error){
				if(error[i]){
					alert('Arregla los errores antes de guardar')
					return
				}
			}
			if(password.pass1 !== password.pass2){
				alert('Arregla los errores antes de guardar')
				return
			}
			for (const i in data){
				
				if((data[i] === '' || data[i] === null) && i !== 'id'){
					alert('Rellena todos los campos antes de guardar')
					return
				}
			}
			if(password.pass1 === '' || password.pass1 === null){
				alert('Rellena todos los campos antes de guardar')
				return
			}
		}
		await UserService.post(data,password.pass1)
		.then(
			res => {
				setData(initialUser);
				setRender(!render);
				handleClose();
			}
		).catch(
			err => {
				console.log(err);
			}
		)
	}

	const handleOpenDeleteConfirmation = () => {
		setDeleteConfirmation({
			id:data.id,
			open:true,
			text:`eliminar al usuario ${data.name}`,
		})
	}

	const handleCloseDeleteConfirmation = () => {
		setDeleteConfirmation({
			...deleteConfirmation,
			open:false,
		})
	}

	const onDelete = async() => {
		await UserService.delete(deleteConfirmation.id)
		.then(
			res => {
				setRender(!render);
				props.handleClose();
			}
		).catch(
			err => {
				console.log(err);
			}
		)
	}

	useEffect(() => {
		setData(user);
	}, [user]);

  	return (
		<Drawer
			anchor='right'
			open={props.open}
			onClose={handleClose}
		>
			<DialogBar>
				<span>{data.id === null ? 'NUEVO USUARIO' : data.name}</span>
			</DialogBar>
			<BodyContainer>
				<ContentContainer>
					<Content>
						{data.id !== null ? (
							<Delete>
								<h3>Borrar Cuenta</h3>
								<span>Una vez que elimine la cuenta,<br/>no hay vuelta atrás<br/></span>
								<Button color='error' title='Eliminar' onClick={handleOpenDeleteConfirmation} startIcon={<Close/>}>Eliminar Usuario</Button>
							</Delete>
						) : null}
						<Inputs>
							<TextField
								id='name' 
								name='name'
								label='Nombre'
								value={data.name}
								onChange={onChangeInput}
								inputProps={{ maxLength: 50 }}
								className='input'
								disabled={data.id !== null}
								error={error.name}
								helperText={error.name ? 'Ingresa un nombre válido' : null}
							/>
							<TextField
								id='rut' 
								name='rut'
								label='R.U.T.'
								value={data.rut}
								onChange={onChangeInput}
								inputProps={{ maxLength: 10 }}
								className='input'
								disabled={data.id !== null}
								error={error.rut}
								helperText={data.id === null ? (error.rut ? 'Ingresa un formato válido' : 'Ingresar Sin puntos y con guión') : null}
							/>
							<TextField
								id='phone' 
								name='phone'
								label='Teléfono'
								value={data.phone}
								onChange={onChangeInput}
								className='input'
								disabled={data.id !== null}
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
							<TextField
								id='mail' 
								name='mail'
								label='Email'
								value={data.mail}
								onChange={onChangeInput}
								inputProps={{ maxLength: 50 }}
								className='input'
								disabled={data.id !== null}
								InputProps={{
									startAdornment: <InputAdornment position='start'><Email/></InputAdornment>,
								}}
								error={error.mail}
								helperText={error.mail ? 'Ingresa un mail válido' : null}
							/>
							<FormControl>
								<FormLabel>Rol</FormLabel>
								<RadioGroup
									name='rol'
									value={data.rol}
									onChange={onChangeInput}
								>
									<FormControlLabel value={2} control={<Radio/>} label='Funcionario' />
									<FormControlLabel value={1} control={<Radio/>} label='Administrador' />
								</RadioGroup>
							</FormControl>
							{data.id === null ? (
								<>
									<TextField
										id='pass1' 
										name='pass1'
										label='Contraseña'
										type='password'
										value={password.pass1}
										onChange={onChangePassword}
										className='password'
									/>
									<TextField
										id='pass2' 
										name='pass2'
										label='Confirma la contraseña'
										type='password'
										value={password.pass2}
										onChange={onChangePassword}
										error={password.pass1 !== password.pass2}
										helperText={password.pass1 !== password.pass2 ? 'Las contraseñas deben coincidir' : null}
									/>
								</>
							) : null}
						</Inputs>
					</Content>
					<DialogFooter>
						<Button title='Cancelar' onClick={handleClose} startIcon={<Close/>}>Cancelar</Button>
						<Button title='Guardar' onClick={handleSend} startIcon={<Save/>}>Guardar</Button>
					</DialogFooter>
				</ContentContainer>
			</BodyContainer>
			<ConfirmationComponent
				open={deleteConfirmation.open}
				onClose={handleCloseDeleteConfirmation}
				text={deleteConfirmation.text}
				confirmation={onDelete}
			/>
		</Drawer>
  	);
}

export default DialogUsersComponent