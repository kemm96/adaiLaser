import React, { useState } from 'react'
import styled from 'styled-components'
import { FlexContainer } from '../styles/styles'
import LayoutComponent from '../components/layout/Layout'
import TablaClientesComponent from '../components/table/TablaClientes'
import DialogClientComponent from '../components/dialog/DialogClient'
import DialogHistorialComponent from '../components/dialog/DialogHistorial'

/***** Component style *****/
const Container = styled(FlexContainer)`
	width: 100%;
	height: 100%;
`
/****** ******************** *****/

const Clientes = () => {
	
	const [openDialogClient, setOpenDialogClient] = useState(false);
	const [openDialogHistorial, setOpenDialogHistorial] = useState(false);
	const [history, setHistory] = useState({
		id:0,
		name:''
	});

	const handleOpenDialogClient = () => {
		setOpenDialogClient(true);
	};
	
	const handleCloseDialogClient = () => {
		setOpenDialogClient(false);
	};

	const handleOpenDialogHistorial = (id, name) => {
		setOpenDialogHistorial(true);
		setHistory({
			id:id,
			name:name
		});
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
					client={history}
				/>
			</Container>
		</LayoutComponent>
	)
}

export default Clientes