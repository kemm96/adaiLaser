import React from 'react'
import styled from 'styled-components'
import { daysName } from '../../utils/lists'
import DayComponent from './CalendarDay'

/***** Component style *****/
const Container = styled.div`
	display:grid;
	grid-template-columns:repeat(7, 1fr);
	grid-template-rows: min-content repeat(6, 1fr);
	width:100%;
`
const Day = styled.div`
	display:flex;
	justify-content:center;
	background-color:#1976D2;
	color:#e0e0e0;
`
/****** ******************** *****/

const CalendarDayComponent = ({ month }) => {

	const handleDisabled = (day, i) => {
		return (day.format('DD') > 7 && i === 0) ? true : (day.format('DD') < 15 && i > 3) ? true : false
	}

	return (
		<Container>
			{daysName.map((day, i) => (
					<Day key={i}>{day}</Day>
			))}
			{month.map((row, i) => (
				<React.Fragment key={i}>
					{row.map((day, j) => (
						<DayComponent
							key={j} 
							day={day}  
							column={j}
							disabled={handleDisabled(day,i)}
						/>
					))}
				</React.Fragment>					
			))}
		</Container>
	)
}

export default CalendarDayComponent