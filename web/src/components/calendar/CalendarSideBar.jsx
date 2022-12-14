import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { FlexContainer } from '../../styles/styles';
import { Button } from '@mui/material'
import TratamientosService from '../../services/tratamientosService'
import { initialEvent } from '../../utils/lists';
import { CalendarContext } from '../../context/CalendarContext';

/***** Component style *****/
const Container = styled.div`
	min-width:max-content;
`
const ButtonContainer = styled(FlexContainer)`
	margin-top:6vh;
`
const TratamientosContainer = styled.div`
	text-align:center;
	& span {
		display:block;
		padding:6vh .5rem 1.5vh .5rem;
	}
`
const Tratamiento = styled.div`
	padding:.3rem .5rem;
	display:flex;
	align-items:center;
	& div{
		width:1.5rem;
		height:1.5rem;
		background-color:#1976D2;
		border-radius:50%;
		margin-right:.5rem;
		background-color:${props => props.color || ''};
	}
`
/****** ******************** *****/

const CalendarSideBarComponent = (props) => {

	const { setEvent, setEdit } = useContext(CalendarContext);

	const [tratamientos, setTratamientos] = useState([])

	const get = async() => {
		await TratamientosService.list()
		.then(
			res => {
				setTratamientos(res);
			}
		).catch(
			err => {
				setTratamientos([]);
				console.log(err);
			}
		)
	}

	const handleOpenDialog = () => {
		setEdit(true)
		setEvent(initialEvent);
		props.handleOpen();
	}

	useEffect(() => {
		get();
	}, []);

	return (
		<Container>
			<ButtonContainer>
				<Button onClick={handleOpenDialog} title='Nueva Cita' variant='contained'>NUEVA CITA</Button>
			</ButtonContainer>
			<TratamientosContainer>
				<span>TRATAMIENTOS</span> 
				{tratamientos.map((data, i) => (
					<Tratamiento color={data.color} key={i}><div/>{data.name}</Tratamiento>
				))}
			</TratamientosContainer>
		</Container>
	)
}

export default CalendarSideBarComponent