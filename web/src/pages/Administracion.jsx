import React, { useState } from 'react'
import styled from 'styled-components'
import LayoutComponent from '../components/layout/Layout'
import { Tabs, Tab } from '@mui/material'
import TablaUsuariosComponent from '../components/table/TablaUsuarios'
import TablaTratamientosComponent from '../components/table/TablaTratamientos'
import DialogTratamientosComponent from '../components/dialog/DialogTratamientos'
import DialogUsersComponent from '../components/dialog/DialogUsers'

/***** Component style *****/
const AdministracionContainer = styled.div`
	width: 100%;
	height: 100%;
	display:flex;
	align-items:center;
	justify-content:center;
`
const TabsContainer = styled.div`
	width: 90%;
	height: 90%;
	display:flex;
	border: 1px solid #e0e0e0;
`
const SwitchContainer = styled.div`
	width: 100%;
	height: 100%;
	border-left: 1px solid #e0e0e0;
	display:flex;
	justify-content:center;
	align-items:center;
`
/****** ******************** *****/

const SwitchCase = (props) => {
	const { children, value, index } = props;

	return (
	<>
		{value === index && (
			<SwitchContainer>{children}</SwitchContainer>
		)}
	</>
	);
}

const Administracion = () => {

	const [value, setValue] = useState(0);
	const [openDialogTratamientos, setOpenDialogTratamientos] = useState(false);
	const [openDialogUsers, setOpenDialogUsers] = useState(false);

	const handleOpenDialogTratamientos = () => {
		setOpenDialogTratamientos(true);
	};
	
	const handleCloseDialogTratamientos = () => {
		setOpenDialogTratamientos(false);
	};

	const handleOpenDialogUsers = () => {
		setOpenDialogUsers(true);
	};
	
	const handleCloseDialogUsers = () => {
		setOpenDialogUsers(false);
	};

  	const handleChange = (e, newValue) => {
    	setValue(newValue);
  	};

	return (
		<LayoutComponent>
			<AdministracionContainer>
				<TabsContainer>
					<Tabs
						orientation='vertical'
						variant='scrollable'
						value={value}
						onChange={handleChange}
					>
						<Tab label='tratamientos'/>
						<Tab label='usuarios'/>
					</Tabs>
					<SwitchCase value={value} index={0}>
						<TablaTratamientosComponent
							handleOpenTratamientos={handleOpenDialogTratamientos}
						/>
						<DialogTratamientosComponent
							open={openDialogTratamientos}
							handleClose={handleCloseDialogTratamientos}
						/>
					</SwitchCase>
					<SwitchCase value={value} index={1}>
						<TablaUsuariosComponent
							handleOpenUsers={handleOpenDialogUsers}
						/>
						<DialogUsersComponent
							open={openDialogUsers}
							handleClose={handleCloseDialogUsers}
						/>
					</SwitchCase>
				</TabsContainer>
			</AdministracionContainer>
		</LayoutComponent>
	)
}

export default Administracion