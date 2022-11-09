import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { FlexContainer } from '../../styles/styles'
import dayjs from 'dayjs'
import { CalendarContext } from '../../context/CalendarContext'
import { CircularProgress } from '@mui/material'
import CalendarService from '../../services/calendarService'
import { horasWeek } from '../../utils/lists'

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
		}
   `}
	${({ domingo }) => domingo && `
		color:#ee0000;
   `}
	${({ disabled, today }) => disabled && today &&`
		background-color:#1976D233;
	`}
`
const ContainerMonthCitas = styled(FlexContainer)`
	flex-wrap:wrap;
	padding:.25rem;
	height:min-content;
`
const MonthCitas = styled(FlexContainer)`
	height:1rem;
	width:1rem;
	margin:.25rem;
	border-radius:50%;
	background-color:${props => props.color || ''};
`
const LoadingContainer = styled(FlexContainer)`
	grid-column: 1 / 3;
	grid-row:1 / 3;
`
const ContainerWeekCitas = styled.div`
	position:relative;
`
const GridHora = styled.div`
	position:absolute;
	top:0;
	width:100%;
	& div{
		height:3rem;
		border-top:1px solid #e0e0e0;
	}
`
const	WeekCitas = styled.div`
	width:90%;
	margin: 0 5%;
	height:${props => `${props.end}rem` || ''};
	position:absolute;
	top:${props => `${props.init}rem` || ''};
	background-color:${props => props.color || ''};
`
/****** ******************** *****/

const CalendarDayComponent = ({ day, column, disabled }) => {
	
	const { boxValue, render, selectValue } = useContext(CalendarContext);

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const handleClick = (i) => {
		if(!disabled && !loading && column !== 0){
			console.log(i);
		}
	}

	const getInit = (hora) => {
		const aux = hora.split(':')
		const horaFind = horasWeek.find(({ hora }) => hora === aux[0]);
		let init = 0;
		let minutes = parseInt(aux[1]) || 0;

		if(minutes >= 30){
			init = horaFind.id + 1;
			minutes = minutes - 30;
		}else{
			init = horaFind.id;
		} 

		const respond =  ((init * 3) + (minutes * 0.1));

		return respond
	}

	const getEnd = (init, end) => {
		const aux = init.split(':')
		const aux2 = end.split(':')
		const minutes1 = (parseInt(aux[0]) * 60) + parseInt(aux[1]);
		const minutes2 = (parseInt(aux2[0]) * 60) + parseInt(aux2[1]);
		
		const respond =  ((minutes2 - minutes1) * 0.1);
		
		return respond
	}

	const get = async() => {
		if(!disabled){
			setLoading(true)
			await CalendarService.list(boxValue, day.format('YYYY-MM-DD'))
			.then(
				res => {
					setData(res);
					setLoading(false)
				}
			).catch(
				err => {
					setData([]);
					console.log(err);
				}
			)
		}
	}

	useEffect(() => {
		get();
	}, [render, boxValue, day]);

	return (
		<Container disabled={disabled || loading || column === 0} onClick={() => handleClick(day)}>
			{loading && !disabled ? (
				<LoadingContainer>
					<CircularProgress/>
				</LoadingContainer>
			) : (
				<React.Fragment>
					<Day 
						today={day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')}
						domingo={column === 0 && !disabled} 
						disabled={disabled}
					>
						<FlexContainer>
							{day.format('DD')}
						</FlexContainer>
					</Day>
					{selectValue === 1 ? (
						<ContainerMonthCitas>
							{data.map((cita, i) => (
								<MonthCitas 
									key={i}
									color={cita.color}
									title={`${cita.name} [desde:${cita.time1}-hasta: ${cita.time2}]`}
								/>
							))}
						</ContainerMonthCitas>
					) : (
						<ContainerWeekCitas>
							<GridHora>
								{horasWeek.map((e, i) => (
									<div key={i}/>
								))}
							</GridHora>
							{data.map((cita, i) => (
								<WeekCitas 
									key={i} 
									title={`${cita.name} [desde:${cita.time1}-hasta: ${cita.time2}]`}
									init={getInit(cita.time1)} 
									end={getEnd(cita.time1,cita.time2)}
									color={cita.color}
								/>
							))}
						</ContainerWeekCitas>
					)}
				</React.Fragment>
			)}
		</Container>
	)
}

export default CalendarDayComponent