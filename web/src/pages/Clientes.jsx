import React, { useState } from 'react'
import styled from 'styled-components'
import LayoutComponent from '../components/layout/Layout'
import TablaClientesComponent from '../components/table/TablaClientes'
import DialogClientComponent from '../components/dialog/DialogClient'
import DialogHistorialComponent from '../components/dialog/DialogHistorial'

/***** Component style *****/
const Container = styled.div`
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
			<Container>
				<TablaClientesComponent 
					handleOpenClient={handleOpenDialogClient}
					handleOpenHistorial={handleOpenDialogHistorial}
				/>
				<DialogClientComponent
					open={openDialogClient}
					handleClose={handleCloseDialogClient}
				/>
				<DialogHistorialComponent
					open={openDialogHistorial}
					handleClose={handleCloseDialogHistorial}
				/>
			</Container>
		</LayoutComponent>
	)
}

export default Clientes