import React from 'react'
import styled from 'styled-components'
import { FlexContainer } from '../../styles/styles'
import dayjs from 'dayjs'

/***** Component style *****/
const Container = styled.div`
	display:grid;
	grid-template-columns:1fr;
	grid-template-rows: 1.5rem 1fr;
	width: 100%;
	height: 100%;
	border:1px solid #e0e0e0;
	cursor:pointer;
	color:#000000;
	:hover{
		background-color:#1976D211;
	}
	${({ disabled }) => disabled && `
		cursor:initial;
		color:#e0e0e0;
		:hover{
			background-color:initial;
		}
   `}
`
const Day = styled(FlexContainer)`
	grid-column: 1 / 2;
	grid-row:1 / 2;
	${({ today }) => today && `
		& div{
			width: 1.5rem;
			height: 1.5rem;
			color:#eeeeee;
			background-color:#1976D2;
			border-radius:50%;
		}
   `}
	${({ domingo }) => domingo && `
		color:#ee0000;
   `}
	${({ disabled, today }) => disabled && today &&`
		background-color:#1976D233;
	`}
`
const ContainerCitas = styled(FlexContainer)`
	flex-wrap:wrap;
	padding:.25rem;
	height:min-content;
`
const Citas = styled(FlexContainer)`
	height:1rem;
	width:1rem;
	margin:.25rem;
	border-radius:50%;
	background-color:${props => props.color || ''};
`
/****** ******************** *****/

const CalendarDayComponent = ({ day, column, disabled, data }) => {

	const handleClick = (i) => {
		if(!disabled){
			console.log(i);
		}
	}

	return (
		<Container disabled={disabled} onClick={() => handleClick(day)}>
			<Day 
				today={day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')}
				domingo={column === 0 && !disabled} 
				disabled={disabled}
			>
				<FlexContainer>
					{day.format('DD')}
				</FlexContainer>
			</Day>
			<ContainerCitas>
				{data.map((cita, i) => (
					<Citas 
						key={i}
						color={cita.color}
						title={`${cita.name} [desde:${cita.time1}-hasta: ${cita.time2}]`}
					/>
				))}
			</ContainerCitas>
		</Container>
	)
}

export default CalendarDayComponent