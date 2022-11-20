import React, { forwardRef, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { DialogBar, FlexContainer } from '../../styles/styles'
import { Dialog, Slide, IconButton, Button } from '@mui/material'
import { Add, Close } from '@mui/icons-material'
import { CalendarContext } from '../../context/CalendarContext'
import { horas, months } from '../../utils/lists'
import CalendarService from '../../services/calendarService'
import { getEnd, getInit } from '../../utils'

/***** Component style *****/
const Container = styled(FlexContainer)`
	height:94vh;
	width:100%;
`
const BodyContainer = styled.div`
	border: 1px solid #e0e0e0;
	height:90%;
	width:90%;
`
const LittleBar = styled(FlexContainer)`
	justify-content:space-around;
	height:5%;
	font-size:1.1rem;
`
const BoxContainer = styled.div`
	height:95%;
	display:grid;
	grid-template-columns: max-content repeat(2, 1fr);
	grid-template-rows: max-content 1fr;
	overflow-y:auto;
`
const HorasContainer = styled.div`
	display:flex;
	flex-direction:column;
	& div {
		font-size:.8rem;
		height:3rem;
		margin:0 .5rem;
	}
`
const Box = styled.div`
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
const	Citas = styled.div`
	width:80%;
	margin: 0 10%;
	height:${props => `${props.end}rem` || ''};
	position:absolute;
	top:${props => `${props.init}rem` || ''};
	background-color:${props => props.color || ''};
	cursor:pointer;
	z-index:1000;
`
/****** ******************** *****/

const transition = forwardRef((props, ref) => {
	return <Slide direction='up' ref={ref} {...props} />;
});

const DialogDayComponent = (props) => {

	const { day, render, setEvent, setEdit } = useContext(CalendarContext);

	const [dataBox1, setDataBox1] = useState([]);
	const [dataBox2, setDataBox2] = useState([]);
	
  	const handleClose = () => {
    	props.handleClose();
  	};

	const handleOpenDialogEvent = async(id) => {
		if(id === -1 || id === -2){
			setEdit(true);
			setEvent({
				id:null,
				user:'',
				client:null,
				tratamiento:'',
				box:(id * (-1)),
				date:day.format('YYYY-MM-DD'),
				time1:'',
				time2:'',
			})
		}else{
			setEdit(false);
			await CalendarService.getCita(id)
			.then(
				res => {
					setEvent(res);
				}
			).catch(
				err => {
					setEvent([]);
					console.log(err);
				}
			);
		}
		props.handleOpen();
	}

	const get = async() => {
		if(day !== null){
			await CalendarService.list(1, day.format('YYYY-MM-DD'))
			.then(
				res => {
					setDataBox1(res);
				}
			).catch(
				err => {
					setDataBox1([]);
					console.log(err);
				}
			);
			await CalendarService.list(2, day.format('YYYY-MM-DD'))
			.then(
				res => {
					setDataBox2(res);
				}
			).catch(
				err => {
					setDataBox2([]);
					console.log(err);
				}
			);
		}
	}

	useEffect(() => {
		get();
	}, [day, render]);

	return (
		<Dialog
			fullScreen
			open={props.open}
			onClose={handleClose}
			TransitionComponent={transition}
		>
			<DialogBar>
				<span>{day !== null ? `${day.format('DD')} de ${months[day.format('MM') - 1].toUpperCase()} de ${day.format('YYYY')}` : null}</span>
				<IconButton onClick={handleClose} title='Cerrar'><Close/></IconButton>
			</DialogBar>
			<Container>	
				<BodyContainer>
					<LittleBar>
						<Button title='Agregar Cita BOX 1' onClick={() => handleOpenDialogEvent(-1)} startIcon={<Add/>}>Agregar Cita Box 1</Button>
						<Button title='Agregar Cita BOX 2' onClick={() => handleOpenDialogEvent(-2)} startIcon={<Add/>}>Agregar Cita Box 2</Button>
					</LittleBar>
					<BoxContainer>
						<HorasContainer>
							{horas.map((hora, i) => (
								<div key={i}>{hora.hora + ':' + hora.minuto}</div>
							))}
						</HorasContainer>
						<Box>
							<GridHora>
								{horas.map((e, i) => (
									<div key={i}/>
								))}
							</GridHora>
							{dataBox1.map((cita, i) => (
								<Citas 
									onClick={() => handleOpenDialogEvent(cita.id)}
									key={i} 
									title={`${cita.name} [desde:${cita.time1}-hasta: ${cita.time2}]`}
									init={getInit(cita.time1)} 
									end={getEnd(cita.time1,cita.time2)}
									color={cita.color}
								/>
							))}
						</Box>
						<Box>
							<GridHora>
								{horas.map((e, i) => (
									<div key={i}/>
								))}
							</GridHora>
							{dataBox2.map((cita, i) => (
								<Citas
									onClick={() => handleOpenDialogEvent(cita.id)}
									key={i} 
									title={`${cita.name} [desde:${cita.time1}-hasta: ${cita.time2}]`}
									init={getInit(cita.time1)} 
									end={getEnd(cita.time1,cita.time2)}
									color={cita.color}
								/>
							))}
						</Box>
					</BoxContainer>
				</BodyContainer>
			</Container>
		</Dialog>
	)
}

export default DialogDayComponent