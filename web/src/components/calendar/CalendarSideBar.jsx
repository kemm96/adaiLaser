import React from 'react'
import styled from 'styled-components'
import MonthComponent from './CalendarMonth'

/***** Component style *****/
const Container = styled.div`
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
		<Container>
			<MonthContainer>
				{/* <MonthComponent month={month}/> */}
			</MonthContainer>
		</Container>
	)
}

export default CalendarSideBarComponent