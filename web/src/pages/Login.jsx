import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PageContainer } from '../styles/style'
import { Box, Button, TextField } from '@mui/material'
import logo from '../assets/images/logoLarge.svg'
import background from '../assets/images/background.jpg'
import LoginService from '../services/loginService'
import { Email, Password } from '@mui/icons-material'
import { logIn, isLogin } from '../utils/auth'

/***** Component style *****/
const PageLoginContainer = styled(PageContainer)`
	background-image:url(${background});
   background-repeat:no-repeat;
   background-size: fill;
   background-position: center;
`
const Container = styled(PageContainer)`
	width:initial;
	height:initial;
	display:flex;
	flex-direction:column;
	background-color:#eeeeeecc;
	border-radius: 0.6rem;
	-webkit-box-shadow: 0px 4px 10px -3px rgba(117, 117, 117, 1);
  	-moz-box-shadow: 0px 4px 10px -3px rgba(117, 117, 117, 1);
 	box-shadow: 0px 4px 10px -3px rgba(117, 117, 117, 1);
 	-webkit-box-shadow: 0px 6px 11px -8px #000000;
  	-moz-box-shadow: 0px 6px 11px -8px #000000;
  	box-shadow: 0px 6px 11px -8px #000000;
	@media (orientation:landscape) {
		flex-direction:row;
   }
`
const Inputs = styled.div`
	padding: 0 10%;
	width:25rem;
	height:20rem;
	display:flex;
	align-items:center;
	justify-content:space-evenly;
	flex-direction:column;
	div{
		margin-bottom:.5rem;
		width:100%;
	}
	button{
		width:100%;
		background-color:#41ABF3;
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
	img{
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
				window.location.href = '/#/';
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
		<PageLoginContainer>
			<Container>
				<Logo>
					<Img>
						<img
							src={logo}
							alt='Logo Adai Laser'
							title='Logo Adai Laser'
						/>
					</Img>
				</Logo>
				<Inputs>
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
				</Inputs>
			</Container>
		</PageLoginContainer>
	)
}

export default Login