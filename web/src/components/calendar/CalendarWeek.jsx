import React from 'react'
import styled from 'styled-components'
import { daysName } from '../../utils/lists'
import CalendarBarComponent from './CalendarBar'

/***** Component style *****/
const Container = styled.div`
	display:flex;
	flex-direction:column;
	width:100%;
	height:94vh;
`
const WeekContainer = styled.div`
	display:grid;
	grid-template-columns:repeat(7, 1fr);
	grid-template-rows: min-content  min-content;
	width:100%;
	height:88vh;
`
const DayName = styled.div`
	display:flex;
	justify-content:center;
	background-color:#1976D2;
	color:#e0e0e0;
`
/****** ******************** *****/

const CalendarWeekComponent = () => {
	return (
		<Container>
			<CalendarBarComponent/>
			<WeekContainer>
				{daysName.map((day, i) => (
					<DayName key={i}>{day}</DayName>
				))}
			</WeekContainer>
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