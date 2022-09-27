import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Box, Button, TextField } from '@mui/material'
import logo from '../assets/images/logoLarge.svg'
import background from '../assets/images/background.jpg'
import LoginService from '../services/loginService'
import { Email, Password } from '@mui/icons-material'
import { logIn, isLogin } from '../utils'
import { BoxShadow } from '../styles/styles'

/***** Component style *****/
const PageContainer = styled.div`
	width: 100vw;
	height: 100vh;
	display:flex;
	align-items:center;
	justify-content:center;
	background-image:url(${background});
   background-repeat:no-repeat;
   background-size: fill;
   background-position: center;
`
const LoginContainer = styled(BoxShadow)`
	flex-direction:column;
	background-color:#eeeeeecc;
	border-radius: 0.6rem;
	@media (orientation:landscape) {
		flex-direction:row;
   }
`
const InputsContainer = styled.div`
	padding: 0 10%;
	width:25rem;
	height:20rem;
	display:flex;
	align-items:center;
	justify-content:space-evenly;
	flex-direction:column;
	& div{
		margin-bottom:.5rem;
		width:100%;
	}
	& button{
		width:100%;
		background-color:#1976D2;
	} 
`
const Logo = styled.div`
	width:30rem;
	height:10rem;
	padding:1rem;
	display:flex;
	align-items:center;
	justify-content:center;
	@media (orientation:landscape) {
		height:20rem;
   }
`
const Img = styled.div`
	width:100%;
	& img{
		width:100%;
	}
`
/****** ******************** *****/

const Login = () => {

	const [user, setUser] = useState({
		mail:'',
		password:''
	});

	const [error, setError] = useState(false);

	const updateState = (e) => {
		let { name, value } = e.target;
		setUser({
			...user,
			[name]: value,
		});
		setError(false);
	}

	const send = () => {		
		LoginService.getToken(user)
		.then(
			res => {
				logIn(res);
			}
		).catch(
			err => {
				setError(true);
			}
		)
	}

	useEffect(() => {
		if(isLogin()){
			window.location.href = '/#/';
		}	
	}, []);

	return (
		<PageContainer id='PageLoginContainer'>
			<LoginContainer>
				<Logo>
					<Img>
						<img
							src={logo}
							alt='Logo Adai Laser'
							title='Logo Adai Laser'
						/>
					</Img>
				</Logo>
				<InputsContainer>
					<Box sx={{ display: 'flex', alignItems: 'center'}}>
						<Email sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
						<TextField 
							id='mail'
							name='mail' 
							variant='standard'
							label='Correo'
							value={user.mail}
							onChange={updateState}
							error={error} 
							helperText={error ? 'usuario o contraseña incorrectos' : null}
						/>
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center'}}>
						<Password sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
						<TextField 
							id='password'
							name='password' 
							variant='standard'
							label='Contraseña'
							value={user.password}
							onChange={updateState}
							type='password'
							error={error} 
							helperText={error ? 'usuario o contraseña incorrectos' : null}
						/>
					</Box>
					<Button onClick={send} variant='contained'>Ingresar</Button>
				</InputsContainer>
			</LoginContainer>
		</PageContainer>
	)
}

export default Login