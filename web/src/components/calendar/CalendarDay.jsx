import React from 'react'
import styled from 'styled-components'
import { FlexContainer } from '../../styles/styles'
import dayjs from 'dayjs'

/***** Component style *****/
const Container = styled(FlexContainer)`
	align-items:flex-start;
	width: 100%;
	height: 100%;
	border:1px solid #e0e0e0;
	cursor:pointer;
	color:#000000;
	:hover{
		background-color:#1976D211;
	}
	${({ disabled }) => disabled && `
		cursor:initial;
		color:#e0e0e0;
		:hover{
			background-color:initial;
		}
   `}
`
const Day = styled(FlexContainer)`
	height:2rem;
	width:2rem;
	${({ today }) => today && `
		color:#eeeeee;
		background-color:#1976D2;
		border-radius:50%;
   `}
	${({ domingo }) => domingo && `
		color:#ee0000;
   `}
	${({ disabled, today }) => disabled && today &&`
		background-color:#1976D233;
	`}
`
/****** ******************** *****/

const CalendarDayComponent = ({ day, column, disabled }) => {

	const handleClick = (i) => {
		if(!disabled){
			console.log(i);
		}
	}

	return (
		<Container disabled={disabled} onClick={() => handleClick(day)}>
			<Day 
				today={day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')}
				domingo={column === 0 && !disabled} 
				disabled={disabled}
			>
				{day.format('DD')}
			</Day>
		</Container>
	)
}

export default CalendarDayComponent