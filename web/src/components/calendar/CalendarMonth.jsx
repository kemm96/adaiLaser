import React from 'react'
import styled from 'styled-components'
import { FlexContainer } from '../../styles/styles'
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
/****** ******************** *****/

const CalendarMonthComponent = ({ month, handleOpen }) => {

	const handleDisabled = (day, i) => {
		return (day.format('DD') > 7 && i === 0) ? true : (day.format('DD') < 15 && i > 3) ? true : false
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
							<CalendarDayComponent
								key={j} 
								day={day}  
								column={j}
								disabled={handleDisabled(day,i)}
								handleOpen={handleOpen}
							/>
						))}
					</React.Fragment>					
				))}
			</MonthContainer>
		</Container>
	)
}

export default CalendarMonthComponent