import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import LayoutComponent from '../components/layout/Layout'
import MonthComponent from '../components/calendar/CalendarMonth'
import { CalendarContext } from '../context/CalendarContext'
import { getMonth, getWeek } from '../utils'
import CalendarSideBarComponent from '../components/calendar/CalendarSideBar'
import WeekComponent from '../components/calendar/CalendarWeek'

/***** Component style *****/
const CalendarContainer = styled.div`
	display:flex;
	width:100vw;
`
/****** ******************** *****/

const SwitchCase = ({ i, month, week }) => {
	switch (i) {
		case 0:
			return <WeekComponent week={week}/>
		case 1:
			return <MonthComponent month={month}/>
		default:
			return null
	}
}

const Calendario = () => {

	const { monthIndex, year, selectValue } = useContext(CalendarContext);
	const [ currentMonth, setCurrentMonth ] = useState(getMonth(monthIndex, year));
	const [ currentWeek, setCurrentWeek ] = useState(getWeek(monthIndex, year));

	useEffect(() => {
		setCurrentMonth(getMonth(monthIndex, year));
		setCurrentWeek(getWeek(monthIndex, year));
	}, [monthIndex, year, selectValue])

	return (
		<LayoutComponent>
			<CalendarContainer>
				<CalendarSideBarComponent/>
				<SwitchCase 
					i={selectValue} 
					month={currentMonth} 
					week={currentWeek}/>
			</CalendarContainer>
		</LayoutComponent>
	)
}

export default Calendario