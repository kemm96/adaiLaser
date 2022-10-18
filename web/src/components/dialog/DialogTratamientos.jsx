import React, { forwardRef, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Dialog, Slide, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { Close, Save } from '@mui/icons-material'
import { AdministracionContext } from '../../context/AdministracionContext';

/***** Component style *****/
const Title = styled.div`
	text-align:center;
	font-size:1.5rem;
	margin-top:.5rem;
`
const Content = styled.div`
	display:flex;
	flex-direction:column;
	margin:1rem;
	& .second {
		margin:1rem 0;
	}
`
const Buttons = styled.div`
	display:flex;
	align-items:center;
	justify-content:center;
	margin-bottom:.5rem;
`
/****** ******************** *****/
const transition = forwardRef((props, ref) => {
	return <Slide direction='up' ref={ref} {...props} />;
});

const DialogTratamientosComponent = (props) => {
	const { tratamiento } = useContext(AdministracionContext);

	const[data, setData] = useState(tratamiento);

	const onChangeInput = (e) => {
      const {name, value} = e.target;

		setData({
			...data,
			[name]: value,
		});
   }

  	const handleClose = () => ()  => {
		props.handleClose();
	};

	useEffect(() => {
		setData(tratamiento);
	}, [tratamiento]);

  	return (
		<Dialog
			open={props.open}
			onClose={handleClose()}
			TransitionComponent={transition}
			keepMounted
		>
			<Title>Tratamiento</Title>
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
				<TextField
					id='color' 
					name='color'
					label='Color'
					value={data.color}
					onChange={onChangeInput}
					inputProps={{ maxLength: 7 }}
				/>
			</Content>
			<Buttons>
				<Button title='Cancelar' onClick={handleClose} startIcon={<Close/>}>Cancelar</Button>
				<Button title='Guardar' onClick={handleClose} startIcon={<Save/>}>Guardar</Button>
			</Buttons>
		</Dialog>
  	);
}

export default DialogTratamientosComponent