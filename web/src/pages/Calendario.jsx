import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import LayoutComponent from '../components/layout/Layout'
import MonthComponent from '../components/calendar/CalendarMonth'
import { CalendarContext } from '../context/CalendarContext'
import { getMonth, getWeek } from '../utils'
import CalendarSideBarComponent from '../components/calendar/CalendarSideBar'
import WeekComponent from '../components/calendar/CalendarWeek'
import DialogEventComponent from '../components/dialog/DialogEvent'

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

	const { week, monthIndex, year, selectValue } = useContext(CalendarContext);
	const [ currentMonth, setCurrentMonth ] = useState([]);
	const [ currentWeek, setCurrentWeek ] = useState([]);

	const [openDialogEvent, setOpenDialogEvent] = useState(true);

	const handleOpenDialogEvent = () => {
		setOpenDialogEvent(true);
	};
	
	const handleCloseDialogEvent = () => {
		setOpenDialogEvent(false);
	};

	useEffect(() => {
		setCurrentMonth(getMonth(monthIndex, year));
		setCurrentWeek(getWeek(week));
	}, [week, monthIndex, year])

	return (
		<LayoutComponent>
			<CalendarContainer>
				<CalendarSideBarComponent
					handleOpen={handleOpenDialogEvent}
				/>
				<SwitchCase 
					i={selectValue} 
					month={currentMonth} 
					week={currentWeek}
				/>
				<DialogEventComponent
					open={openDialogEvent}
					handleClose={handleCloseDialogEvent}
				/>
			</CalendarContainer>
		</LayoutComponent>
	)
}

export default Calendario