import React, { useState } from 'react'
import styled from 'styled-components'
import LayoutComponent from '../components/layout/Layout'
import TablaClientesComponent from '../components/TablaClientes'
import ClientDialog from '../components/ClientDialog'
import { ClientContextWrapper } from '../context/ClientContext'
import HistorialDialog from '../components/HistorialDialog'

/***** Component style *****/
const ClientsContainerer = styled.div`
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
			<ClientsContainerer>
				<ClientContextWrapper>
					<TablaClientesComponent 
						handleOpenClient={handleOpenDialogClient}
						handleOpenHistorial={handleOpenDialogHistorial}
					/>
					<ClientDialog 
						open={openDialogClient}
						handleClose={handleCloseDialogClient}
					/>
					<HistorialDialog
						open={openDialogHistorial}
						handleClose={handleCloseDialogHistorial}
					/>
				</ClientContextWrapper>
			</ClientsContainerer>
		</LayoutComponent>
	)
}

export default Clientes