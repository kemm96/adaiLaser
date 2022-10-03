import React from 'react'
import styled from 'styled-components'
import MonthComponent from './MonthComponent'

/***** Component style *****/
const SideBarContainer = styled.div`
background-color:yellow;
	width:15vw;
	height:100%;
`
const MonthContainer = styled.div`
	width:80%;
	height:100%;
`
/****** ******************** *****/

const CalendarSideBarComponent = ({ month }) => {

	return (
		<SideBarContainer>
			<MonthContainer>
				{/* <MonthComponent month={month}/> */}
			</MonthContainer>
		</SideBarContainer>
	)
}

export default CalendarSideBarComponent