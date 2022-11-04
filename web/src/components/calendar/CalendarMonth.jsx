import React from 'react'
import styled from 'styled-components'
import { FlexContainer } from '../../styles/styles'
import { daysName } from '../../utils/lists'
import dayjs from 'dayjs'
import CalendarBarComponent from './CalendarBar'

/***** Component style *****/
const Container = styled.div`
	display:flex;
	flex-direction:column;
	width:100%;
	height:94vh;
`
const MonthContainer = styled.div`
	display:grid;
	grid-template-columns:repeat(7, 1fr);
	grid-template-rows: min-content repeat(6, 1fr);
	width:100%;
	height:88vh;
`
const DayName = styled(FlexContainer)`
	background-color:#1976D2;
	color:#e0e0e0;
`
const DayContainer = styled(FlexContainer)`
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

const CalendarMonthComponent = ({ month }) => {

	const handleDisabled = (day, i) => {
		return (day.format('DD') > 7 && i === 0) ? true : (day.format('DD') < 15 && i > 3) ? true : false
	}

	const handleClick = (i) => {
		if(!disabled){
			console.log(i);
		}
	}

	return (
		<Container>
			<CalendarBarComponent/>
			<MonthContainer>
				{daysName.map((day, i) => (
					<DayName key={i}>{day}</DayName>
				))}
				{month.map((row, i) => (
					<React.Fragment key={i}>
						{row.map((day, j) => (
							<DayContainer key={j} disabled={handleDisabled(day,i)} onClick={() => handleClick(day)}>
								<Day 
									today={day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')}
									domingo={j === 0 && !handleDisabled(day,i)} 
									disabled={handleDisabled(day,i)}
								>
									{day.format('DD')}
								</Day>
							</DayContainer>
						))}
					</React.Fragment>					
				))}
			</MonthContainer>
		</Container>
	)
}

export default CalendarMonthComponent