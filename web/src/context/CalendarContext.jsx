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
	boxValue: 1,
	setBoxValue: (i) => {},
	event: {},
	setEvent: (i) => {},
	render:{},
	setRender: (i) => {},
	day:{},
	setDay: (i) => {},
	edit: {}, 
	setEdit: (i) => {},
})

export const CalendarContextWrapper = ({ children }) => {
	const [ week , setWeek] = useState(0)
	const [ monthIndex, setMonthIndex] = useState(dayjs().month());
	const [ year, setYear] = useState(dayjs().year());
	const [ selectValue , setSelectValue] = useState(1);
	const [ boxValue , setBoxValue] = useState(1);
	const [ event, setEvent] = useState(initialEvent);
	const [ render, setRender] = useState(true);
	const [ day, setDay] = useState(null);
	const [edit, setEdit] = useState(true);

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
			boxValue,
			setBoxValue,
			event,
			setEvent,
			render,
			setRender,
			day,
			setDay,
			edit, 
			setEdit,
		}}>
			{children}
		</CalendarContext.Provider>
	)
}