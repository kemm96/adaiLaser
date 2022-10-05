import React from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'

/***** Component style *****/
const DayContainer = styled.div`
	display:flex;
	justify-content:center;
	width: 100%;
	height: 100%;
	border:1px solid #e0e0e0;
	cursor:pointer;
	color:#000000;
	:hover{
		background-color:#1976D233;
	}
	${({ disabled }) => disabled && `
		cursor:initial;
		color:#e0e0e0;
		:hover{
			background-color:initial;
		}
   `}
`
const Day = styled.div`
	display:flex;
	justify-content:center;
	align-items:center;
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

const DayComponent = ({ day, column, disabled }) => {

	const handleClick = (i) => {
		if(!disabled){
			console.log(i);
		}
	}

	return (
		<DayContainer disabled={disabled} onClick={() => handleClick(day)}>
			<Day 
				today={day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')}
				domingo={column === 0 && !disabled} 
				disabled={disabled}
			>
				{day.format('DD')}
			</Day>
		</DayContainer>
	)
}

export default DayComponent
