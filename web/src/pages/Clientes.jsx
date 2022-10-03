import React, { useState } from 'react'
import styled from 'styled-components'
import LayoutComponent from '../components/layout/Layout'
import TablaClientesComponent from '../components/TablaClientesComponent'
import ClientDialogComponent from '../components/ClientDialogComponent'
import { ClientContextWrapper } from '../context/ClientContext'
import HistorialDialogComponent from '../components/HistorialDialogComponent'

/***** Component style *****/
const ClientsContainer = styled.div`
	width: 100%;
	height: 100%;
	display:flex;
	align-items:center;
	justify-content:center;
`
/****** ******************** *****/

const Clientes = () => {
	
	const [openDialogClient, setOpenDialogClient] = useState(false);
	const [openDialogHistorial, setOpenDialogHistorial] = useState(false);

	const handleOpenDialogClient = () => {
		setOpenDialogClient(true);
	};
	
	const handleCloseDialogClient = () => {
		setOpenDialogClient(false);
	};

	const handleOpenDialogHistorial = (id) => {
		setOpenDialogHistorial(true);
	};
	
	const handleCloseDialogHistorial = () => {
		setOpenDialogHistorial(false);
	};

	return (
		<LayoutComponent>
			<ClientsContainer>
				<TablaClientesComponent 
					handleOpenClient={handleOpenDialogClient}
					handleOpenHistorial={handleOpenDialogHistorial}
				/>
				<ClientDialogComponent
					open={openDialogClient}
					handleClose={handleCloseDialogClient}
				/>
				<HistorialDialogComponent
					open={openDialogHistorial}
					handleClose={handleCloseDialogHistorial}
				/>
			</ClientsContainer>
		</LayoutComponent>
	)
}

export default Clientes