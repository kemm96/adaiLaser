import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { DialogBar, DialogFooter, FlexContainer } from '../../styles/styles';
import { Button, TextField, Drawer } from '@mui/material'
import { Close, Save } from '@mui/icons-material'
import { AdministracionContext } from '../../context/AdministracionContext';
import { ChromePicker } from 'react-color'
import TratamientosService from '../../services/tratamientosService';
import { initialTratamiento, tratamientoError } from '../../utils/lists';
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
	width:100%;
	margin-top:1rem;
	display:flex;
	flex-direction:column;
	height:100%;
	overflow-y:auto;
	& .second {
		margin:1rem 0;
	}
`
/****** ******************** *****/

const DialogTratamientosComponent = (props) => {
	const { tratamiento, render, setRender } = useContext(AdministracionContext);

	const [data, setData] = useState(tratamiento);
	const [error, setError]= useState(tratamientoError);

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

	const onChangeColor = (color) => {
		setData({
			...data,
			color: color.hex,
		});
   }

  	const handleClose = () => {
		setData(tratamiento);
		props.handleClose();
	};

	const handleSend = async() => {
		for (const i in error){
			if(error[i]){
				alert('Arregla los errores antes de guardar')
				return
			}
		}
		if(data['name'] === '' || data['name'] === null){
			alert('Rellena el nombre antes de guardar')
			return
		}	
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
			<DialogBar>
				<span>{data.id === null ? 'NUEVO TRATAMIENTO' : data.name}</span>
			</DialogBar>
			<BodyContainer>
				<ContentContainer>
					<Content>
						<TextField
							id='name' 
							name='name'
							label='Nombre'
							value={data.name}
							onChange={onChangeInput}
							inputProps={{ maxLength: 50 }}
							error={error.name}
							helperText={error.name ? 'Ingresa un nombre v??lido' : null}
						/>
						<TextField
							id='time' 
							name='time'
							label='Duraci??n (minutos)'
							value={data.time}
							onChange={onChangeInput}
							inputProps={{ maxLength: 5 }}
							className='second'
							error={error.time}
							helperText={error.time ? 'Ingresa un valor v??lido' : null}
						/>
						<FlexContainer>
							<ChromePicker 
								color={data.color}
								onChange={onChangeColor}
								disableAlpha={true}
							/>
						</FlexContainer>
					</Content>
					<DialogFooter>
						<Button title='Cancelar' onClick={handleClose} startIcon={<Close/>}>Cancelar</Button>
						<Button title='Guardar' onClick={handleSend} startIcon={<Save/>}>Guardar</Button>
					</DialogFooter>
				</ContentContainer>
			</BodyContainer>
		</Drawer>
  	);
}

export default DialogTratamientosComponent