import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import logoLarge from '../../assets/images/logoLarge.svg'
import logo from '../../assets/images/logo.svg'
import { Avatar, Menu, MenuItem } from '@mui/material'
import { getTokenData, logOut } from '../../utils'
import { NavLink } from "react-router-dom";
import { BoxShadow } from '../../styles/styles'

/***** Component style *****/
const NavContainer = styled(BoxShadow)`
	width:100%;
	height:6vh;
`
const ImgContainer = styled.div`
	height:100%;
	width:30%;
	min-width:max-content;
	display:flex;
	align-items:center;
	padding: 0 2rem;
`
const Img = styled.img`
	height:${props => props.landscape ? '50%' : '80%'};
	display:${props => props.landscape ? 'none' : 'initial'};
	@media (orientation:landscape) {
		display:${props => props.landscape ? 'initial' : 'none'};
	}
`
const Nav = styled.nav`
	display:flex;
	align-items:center;
	width:100%;
`
const NavLinkStyled = styled(NavLink)`
	position:relative;
	margin-right:1.5rem;
	cursor:pointer;
	&:hover{
		color:#1976D2;
	}
	&.active {
		color:#1976D2;
		::after{
         content: '';
         position: absolute;
         right:0;
			bottom:-.2rem;
         height: .15rem;
         width: 100%;
         background-color:#1976D2;
      }
	}
`
const AvatarContainer = styled.div`
	display:flex;
	align-items:center;
	padding: 0 2rem;
	& div{
		background-color:#1976D2;
		cursor: pointer;
	}
`
const MenuItemStyled = styled(MenuItem)`
	&:focus{
		background-color:transparent;
	}
	&:hover{
		background-color:#eeeeee;
	}
`
/****** ******************** *****/

const NavBarComponent = () => {

	const [token, settoken] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	
	const openAvatar = (event) => {
	  setAnchorEl(event.currentTarget);
	};

	const closeAvatar = () => {
	  setAnchorEl(null);
	};

	useEffect(() => {
		settoken(getTokenData());
	}, []);

	return (
		<NavContainer>
			<NavLink to='/'>
				<ImgContainer>
					<Img
						landscape
						src={logoLarge}
						alt='Logo Adai Laser'
						title='Logo Adai Laser'
					/>
					<Img
						src={logo}
						alt='Logo Adai Laser'
						title='Logo Adai Laser'
					/>
				</ImgContainer>
			</NavLink>
			<Nav>
				<NavLinkStyled to='/calendario'>CALENDARIO</NavLinkStyled>
				<NavLinkStyled to='/clientes'>CLIENTES</NavLinkStyled>
			</Nav>
			<AvatarContainer>
				<Avatar
					id='avatar'
					title={`${token ? token.user.name : null}`}
					alt={`${token ? token.user.name : null}`}
					onClick={openAvatar}
				>
					KM
				</Avatar>
				<Menu
					anchorEl={anchorEl}
					open={open}
					onClose={closeAvatar}
				>
					<MenuItemStyled onClick={closeAvatar}>Mi Perfil</MenuItemStyled>
					<MenuItemStyled onClick={logOut}>Cerrar Sesión</MenuItemStyled>
				</Menu>
			</AvatarContainer>
		</NavContainer>
	)
}

export default NavBarComponent