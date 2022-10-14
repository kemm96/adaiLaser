import React, { useState } from 'react'
import styled from 'styled-components'
import LayoutComponent from '../components/layout/Layout'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import UsuariosComponent from '../components/UsuariosComponent';
import TratamientosComponent from '../components/TratamientosComponent';
import TrataminetosDrawerComponent from '../components/TrataminetosDrawerComponent';

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
	const [openDrawerTratamientos, setOpenDrawerTratamientos] = useState(false);

	const handleOpenDrawerTratamientos = () => {
		setOpenDrawerTratamientos(true);
	};
	
	const handleCloseDrawerTratamientos = () => {
		setOpenDrawerTratamientos(false);
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
						<Tab label='usuarios'></Tab>
						<Tab label='tratamientos'/>
					</Tabs>
					<SwitchCase value={value} index={0}>
						<UsuariosComponent/>
					</SwitchCase>
					<SwitchCase value={value} index={1}>
						<TratamientosComponent
							handleOpenDrawer={handleOpenDrawerTratamientos}
						/>
					</SwitchCase>
				</TabsContainer>
				<TrataminetosDrawerComponent
					open={openDrawerTratamientos}
					handleClose={handleCloseDrawerTratamientos}
				/>
			</AdministracionContainer>
		</LayoutComponent>
	)
}

export default Administracion