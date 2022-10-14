import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import LayoutComponent from '../components/layout/Layout'
import MonthComponent from '../components/calendar/CalendarMonth'
import { CalendarContext } from '../context/CalendarContext'
import { getMonth } from '../utils'
import CalendarBarComponent from '../components/calendar/CalendarBar'
import CalendarSideBarComponent from '../components/calendar/CalendarSideBar'
import WeekComponent from '../components/calendar/CalendarWeek'


/***** Component style *****/
const CalendarContainer = styled.div`
	display:flex;
	width:100%;
	height:88vh;
`
/****** ******************** *****/

const SwitchCase = ({ i, month }) => {
	switch (i) {
		case 0:
			return (
				<WeekComponent/>
			)
		case 1:
			return (
				<MonthComponent month={month}/>
			)
		default:
			return null
	}
}

const Calendario = () => {

	const { monthIndex, year, selectValue } = useContext(CalendarContext);
	const [ currentMonth, setCurrentMonth ] = useState(getMonth(monthIndex, year));

	useEffect(() => {
		setCurrentMonth(getMonth(monthIndex, year))
	}, [monthIndex, year, selectValue])

	return (
		<LayoutComponent>
			<CalendarBarComponent/>
			<CalendarContainer>
				{/* <CalendarSideBarComponent month={currentMonth}/> */}
				<SwitchCase i={selectValue} month={currentMonth}/>
			</CalendarContainer>
		</LayoutComponent>
	)
}

export default Calendario