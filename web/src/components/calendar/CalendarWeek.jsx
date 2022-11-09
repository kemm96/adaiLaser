import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { CalendarContext } from '../../context/CalendarContext'
import { daysName } from '../../utils/lists'
import CalendarBarComponent from './CalendarBar'
import CalendarDayComponent from './CalendarDay'

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
	grid-template-rows: min-content 1fr;
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

const CalendarWeekComponent = ({ week }) => {

	const { render } = useContext(CalendarContext);

	useEffect(() => {
		
	}, [render]);

	return (
		<Container>
			<CalendarBarComponent/>
			<WeekContainer>
				{daysName.map((day, i) => (
					<DayName key={i}>{day}</DayName>
				))}
				{week.map((day, i) => (
					<CalendarDayComponent
						key={i} 
						day={day}
						column={i === 0 ? i : null}
						data={[]}
					/>			
				))}
			</WeekContainer>
		</Container>
	)
}

export default CalendarWeekComponent
