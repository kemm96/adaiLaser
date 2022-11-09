import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { FlexContainer } from '../../styles/styles'
import { ArrowBackIosNew, ArrowForwardIos, Today } from '@mui/icons-material'
import { Button, IconButton, MenuItem, Select } from '@mui/material'
import { months } from '../../utils/lists'
import { CalendarContext } from '../../context/CalendarContext'
import dayjs from 'dayjs'
import { getWeek } from '../../utils'

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
	& .box {
		margin-left:1.5rem;
	}
`
/****** ******************** *****/

const CalendarBarComponent = () => {

	const selectMap = ['Semana', 'Mes']
	const boxMap = [{id:1,name:'Box 1'}, {id:2,name:'Box 2'}]

	const { week, setWeek, monthIndex, setMonthIndex, year, setYear, selectValue, setSelectValue, boxValue, setBoxValue } = useContext(CalendarContext);

	const [ weekMonths, setWeekMonths ] = useState([]);

	const onChangeSelect = (e) => {
		const { value, name } = e.target;
		if(name === 'select'){
			setSelectValue(value);
			handleToday();
		}else{
			setBoxValue(value);
		}
	}

	const handleToday = () => {
		setMonthIndex(dayjs().month());
		setWeek(0);
		setYear(dayjs().year());
	}

	const subtractMonthIndex = () => {
		if(selectValue === 0){
			setWeek(week - 7)
		}else{
			if(monthIndex === 0){
				setMonthIndex(11);
				setYear(year - 1);
			}else{ 
				setMonthIndex(monthIndex - 1)
			}
		}
	}

	const AddMonthIndex = () => {
		if(selectValue === 0){
			setWeek(week + 7)
		}else{
			if(monthIndex === 11){
				setMonthIndex(0);
				setYear(year + 1);
			}else{
				setMonthIndex(monthIndex + 1)
			}
		}
	}

	const getWeekMonth = () => {
		let currentWeek = getWeek(week)
		let first = dayjs(currentWeek[0]);
		let last =  dayjs(currentWeek[6]);
		
		let firstMonth = '';
		
		if(first.month() !== last.month()){
			firstMonth = months[first.month()].toUpperCase()
		}
		
		setWeekMonths([
			first.format('DD'),
			firstMonth,
			last.format('DD'),
			months[last.month()].toUpperCase(),
		])
	}

	useEffect(() => {
		getWeekMonth();
	}, [week])

	return (
		<Container>
			<FlexContainer>
				<Button title='Hoy' onClick={handleToday} startIcon={<Today/>}>Hoy</Button>
				<IconButton onClick={subtractMonthIndex}><ArrowBackIosNew/></IconButton>
				<IconButton onClick={AddMonthIndex}><ArrowForwardIos/></IconButton>
				{selectValue === 0 ? (
					<div>{weekMonths[0]} {weekMonths[1]} - {weekMonths[2]} {weekMonths[3]}</div>
				) : (
					<div>{months[monthIndex].toUpperCase()} {year}</div>
				)}
			</FlexContainer>
			<div>{boxMap[boxValue - 1].name.toUpperCase()}</div>
			<SelectContainer>
				<Select
					name='select'
					value={selectValue}
					onChange={onChangeSelect}
				>
					{
						selectMap.map((opcion, i) => (
							<MenuItem key={i} value={i}>{opcion}</MenuItem>
						))
					}
				</Select>
				<Select
					name='box'
					value={boxValue}
					onChange={onChangeSelect}
					className='box'
				>
					{
						boxMap.map((opcion, i) => (
							<MenuItem key={i} value={opcion.id}>{opcion.name}</MenuItem>
						))
					}
				</Select>
			</SelectContainer>
		</Container>
	)
}

export default CalendarBarComponent