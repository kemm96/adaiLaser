import React from 'react'
import styled from 'styled-components'
import { daysName, horas } from '../../utils/lists'
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
	grid-template-columns: max-content repeat(7, 1fr);
	grid-template-rows: min-content 1fr;
	width:100%;
	height:88vh;
	overflow-y:auto;
`
const DayName = styled.div`
	display:flex;
	justify-content:center;
	background-color:#1976D2;
	color:#e0e0e0;
`
const HorasContainer = styled.div`
	display:flex;
	flex-direction:column;
	margin-top:1.5rem;
	& div {
		font-size:.8rem;
		height:3rem;
		margin:0 .5rem;
	}
`
/****** ******************** *****/

const CalendarWeekComponent = ({ week,handleOpen }) => {

	return (
		<Container>
			<CalendarBarComponent/>
			<WeekContainer>
				<div/>
				{daysName.map((day, i) => (
					<DayName key={i}>{day}</DayName>
				))}
				<HorasContainer>
					{horas.map((hora, i) => (
						<div key={i}>{hora.hora + ':' + hora.minuto}</div>
					))}
				</HorasContainer>
				{week.map((day, i) => (
					<CalendarDayComponent
						key={i} 
						day={day}
						column={i === 0 ? i : null}
						handleOpen={handleOpen}
					/>			
				))}
			</WeekContainer>
		</Container>
	)
}

export default CalendarWeekComponent
