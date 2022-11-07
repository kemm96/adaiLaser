import React, { createContext, useState } from 'react'
import dayjs from 'dayjs'
import { initialEvent } from '../utils/lists'

export const CalendarContext = createContext({
	week: 0,
	setWeek: (i) => {},
	monthIndex: dayjs().month(),
	setMonthIndex : (i) => {},
	year: dayjs().year(),
	setYear : (i) => {},
	selectValue: 1,
	setSelectValue: (i) => {},
	event: {},
	setEvent: (i) => {},
	render:{},
	setRender: (i) => {},
})

export const CalendarContextWrapper = ({ children }) => {
	const [ week , setWeek] = useState(0)
	const [ monthIndex, setMonthIndex] = useState(dayjs().month());
	const [ year, setYear] = useState(dayjs().year());
	const [ selectValue , setSelectValue] = useState(1);
	const [ event, setEvent] = useState(initialEvent);
	const [ render, setRender] = useState(true);

	return (
		<CalendarContext.Provider value={{
			week,
			setWeek,
			monthIndex, 
			setMonthIndex,
			year,
			setYear,
			selectValue,
			setSelectValue,
			event,
			setEvent,
			render,
			setRender
		}}>
			{children}
		</CalendarContext.Provider>
	)
}