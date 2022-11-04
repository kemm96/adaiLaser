import React, { useContext } from 'react'
import styled from 'styled-components'
import { FlexContainer } from '../../styles/styles'
import { ArrowBackIosNew, ArrowForwardIos, Today } from '@mui/icons-material'
import { Button, IconButton, MenuItem, Select } from '@mui/material'
import { months } from '../../utils/lists'
import { CalendarContext } from '../../context/CalendarContext'
import dayjs from 'dayjs'

/***** Component style *****/
const Container = styled(FlexContainer)`
	padding:0 5vw;
	width:100%;
	height:6vh;
	justify-content:space-between;
	& button{
		color:#1976D2;
		:hover{
			background-color:#1976D211;
		}
	}
`
const SelectContainer = styled(FlexContainer)`
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
			<FlexContainer>
				<Button title='Hoy' onClick={handleToday} startIcon={<Today/>}>Hoy</Button>
				<IconButton onClick={subtractMonthIndex}><ArrowBackIosNew/></IconButton>
				<IconButton onClick={AddMonthIndex}><ArrowForwardIos/></IconButton>
				<div>{months[monthIndex].toUpperCase()} {year}</div>
			</FlexContainer>
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