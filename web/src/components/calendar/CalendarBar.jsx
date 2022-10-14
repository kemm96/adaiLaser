import React, { useContext } from 'react'
import styled from 'styled-components'
import { ArrowBackIosNew, ArrowForwardIos, Today } from '@mui/icons-material'
import { Button, IconButton, MenuItem, Select } from '@mui/material'
import { months } from '../../utils/lists'
import { CalendarContext } from '../../context/CalendarContext'
import dayjs from 'dayjs'

/***** Component style *****/
const Container = styled.div`
	position:relative;
	padding:0 15vw;
	display:flex;
	align-items:center;
	width:100%;
	height:6vh;
	& button{
		color:#1976D2;
		:hover{
			background-color:#1976D233;
		}
	}
`
const TodayContainer = styled.div`
	display:flex;
	justify-content:center;
	align-items:center;
	button{
		color:#1976D2;
		:hover{
			background-color:#1976D233;
		}
	}
`
const SelectContainer = styled.div`
	display:flex;
	align-items:center;
	position:absolute;
	right:5vw;
	height:100%;
	& div{
		height:60%;
	}
`
/****** ******************** *****/

const CalendarBarComponent = () => {

	const selectMap = ['Semana', 'Mes']

	const { monthIndex, setMonthIndex, year, setYear, selectValue, setSelectValue } = useContext(CalendarContext);

	const onChangeSelect = (e) => {
		const { value } = e.target;
		setSelectValue(value);
	}

	const handleToday = () => {
		setMonthIndex(dayjs().month());
		setYear(dayjs().year());
	}

	const subtractMonthIndex = () => {
		if(monthIndex === 0){
			setMonthIndex(11);
			setYear(year - 1);
		}else{ 
			setMonthIndex(monthIndex - 1)
		}
	}

	const AddMonthIndex = () => {
		if(monthIndex === 11){
			setMonthIndex(0);
			setYear(year + 1);
		}else{
			setMonthIndex(monthIndex + 1)
		}
	}

	return (
		<Container>
			<TodayContainer>
				<Button title='Hoy' onClick={handleToday} startIcon={<Today/>}>Hoy</Button>
			</TodayContainer>
			<IconButton onClick={subtractMonthIndex}><ArrowBackIosNew/></IconButton>
			<IconButton onClick={AddMonthIndex}><ArrowForwardIos/></IconButton>
			<div>{months[monthIndex]} {year}</div>
			<SelectContainer>
				<Select
					value={selectValue}
					onChange={onChangeSelect}
				>
					{
						selectMap.map((opcion, i) => (
							<MenuItem key={i} value={i}>{opcion}</MenuItem>
						))
					}
				</Select>
			</SelectContainer>
		</Container>
	)
}

export default CalendarBarComponent