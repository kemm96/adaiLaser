import React, { forwardRef, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Dialog, Slide, TextField, Drawer } from '@mui/material'
import { Close, Save } from '@mui/icons-material'
import { AdministracionContext } from '../../context/AdministracionContext';
import { ChromePicker } from 'react-color'
import { BoxShadow } from '../../styles/styles';
import TratamientosService from '../../services/tratamientosService';
import { initialTratamiento } from '../../utils/lists';

/***** Component style *****/
const Bar = styled(BoxShadow)`
	height:6vh;
	align-items:center;
	padding: 0 1rem;
	background-color:#1976D2;
	text-align:center;
	& span{
		color:#ffffff;
		font-size:1.5rem;
	}
`
const BodyContainer = styled.div`
	display:flex;
	justify-content:center;
	align-items:center;
	height:88vh;
`
const Content = styled.div`
	display:flex;
	flex-direction:column;
	height:90%;
	margin:0 1rem;
	& .second {
		margin:1rem 0;
	}
`
const Footer = styled.div`
	height:6vh;
	display:flex;
	align-items:center;
	justify-content:center;
	padding: 0 1rem;
`
/****** ******************** *****/

const DialogTratamientosComponent = (props) => {
	const { tratamiento, render, setRender } = useContext(AdministracionContext);

	const [data, setData] = useState(tratamiento);

	const onChangeInput = (e) => {
      const {name, value} = e.target;

		setData({
			...data,
			[name]: value,
		});
   }

	const onChangeColor = (color) => {
		setData({
			...data,
			color: color.hex,
		});
   }

  	const handleClose = () => {
		props.handleClose();
	};

	const handleSend = async() => {
		await TratamientosService.post(data)
		.then(
			res => {
				setData(initialTratamiento);
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
		setData(tratamiento);
	}, [tratamiento]);

  	return (
		<Drawer
			anchor='right'
			open={props.open}
			onClose={handleClose}
		>
			<Bar>
				<span>{'TRATAMIENTO'}</span>
			</Bar>
			<BodyContainer>
				<Content>
					<TextField
						id='name' 
						name='name'
						label='Nombre'
						value={data.name}
						onChange={onChangeInput}
						inputProps={{ maxLength: 50 }}
					/>
					<TextField
						id='time' 
						name='time'
						label='Duración (minutos)'
						value={data.time}
						onChange={onChangeInput}
						inputProps={{ maxLength: 5 }}
						className='second'
					/>
					<ChromePicker 
						color={data.color}
						onChange={onChangeColor}
						disableAlpha={true}
					/>
				</Content>
			</BodyContainer>
			<Footer>
				<Button title='Cancelar' onClick={handleClose} startIcon={<Close/>}>Cancelar</Button>
				<Button title='Guardar' onClick={handleSend} startIcon={<Save/>}>Guardar</Button>
			</Footer>
		</Drawer>
  	);
}

export default DialogTratamientosComponent