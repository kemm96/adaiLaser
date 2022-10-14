import React from 'react'
import styled from 'styled-components'
import { daysName } from '../../utils/lists'
import DayComponent from './CalendarDay'

/***** Component style *****/
const Container = styled.div`
	display:grid;
	grid-template-columns:repeat(7, 1fr);
	grid-template-rows: min-content min-content;
	width:100%;
	height:100%;
`
const Day = styled.div`
	display:flex;
	justify-content:center;
	border:1px solid #e0e0e0;
`
/****** ******************** *****/

const CalendarWeekComponent = () => {
	return (
		<Container>
			{daysName.map((day, i) => (
				<Day key={i}>{day}</Day>
			))}
			{/* {month.map((row, i) => (
				<React.Fragment key={i}>
					{row.map((day, j) => (
						<DayComponent
							key={j} 
							day={day}  
							row={i} 
							column={j}
							disabled={handleDisabled(day,i)}
						/>
					))}
				</React.Fragment>					
			))} */}
		</Container>
	)
}

export default CalendarWeekComponent