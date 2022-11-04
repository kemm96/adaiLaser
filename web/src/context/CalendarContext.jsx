import React, { createContext, useState } from 'react'
import dayjs from 'dayjs'

export const CalendarContext = createContext({
	monthIndex: dayjs().month(),
	setMonthIndex : (i) => {},
	year: dayjs().year(),
	setYear : (i) => {},
	selectValue: 0,
	setSelectValue: (i) => {},
})

export const CalendarContextWrapper = ({ children }) => {
	const [monthIndex, setMonthIndex] = useState(dayjs().month());
	const [year, setYear] = useState(dayjs().year());
	const [ selectValue , setSelectValue] = useState(0)

	return (
		<CalendarContext.Provider value={{
			monthIndex, 
			setMonthIndex,
			year,
			setYear,
			selectValue,
			setSelectValue,
		}}>
			{children}
		</CalendarContext.Provider>
	)
}