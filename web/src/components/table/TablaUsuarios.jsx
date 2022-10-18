import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from '@mui/material';
import { DataGrid, esES, GridActionsCellItem, GridToolbarFilterButton } from '@mui/x-data-grid'
import { Add, Settings } from '@mui/icons-material'
import UserService from '../../services/userService'
import { CustomNoRowsContainer, CustomToolbarContainer, TablaContainer } from '../../styles/styles'

/***** Component style *****/

/****** ******************** *****/

const CustomNoRows = () => {
		return (
			<CustomNoRowsContainer>No hay usuarios disponibles</CustomNoRowsContainer>
		);
	}

const TablaUsuariosComponent = () => {

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const handleOpenUsuario = (id) => {
		console.log(id);
	}

	const CustomToolbar = () => {
		return (
			<CustomToolbarContainer>
				<div>
					<GridToolbarFilterButton title='Filtros'/>
				</div>
				<div>
					<Button title='Agregar Tratamiento' onClick={() => handleOpenUsuario(0)} startIcon={<Add/>}>Agregar Usuario</Button>
				</div>
			</CustomToolbarContainer>
		);
	}

	const columns = [
		{ field: 'name', headerName: 'Nombre',flex: 1, headerClassName: 'header',},
		{ field: 'mail', headerName: 'Correo',flex: 1, hideable: false, headerClassName: 'header', cellClassName:'cell', headerAlign: 'center',},
		{ field: 'rol', headerName: 'Rol',flex: 1, hideable: false, headerClassName: 'header', cellClassName:'cell', headerAlign: 'center', maxWidth:150,},
		{
			field: 'options',
			type: 'actions',
			headerName: 'Opciones',
			flex: 1,
			maxWidth:100,
			hideable: false,
			headerClassName: 'header',
			getActions: ({ id }) => {
				return [
					<GridActionsCellItem
						icon={<Settings/>}
						label='Configuración'
						title='Configuración'
					/>,
				]
			},
		}
	]

	const get = async() => {
		setLoading(true);
		await UserService.list()
		.then(
			res => {
				setData(res);
				setLoading(false);
			}
		).catch(
			err => {
				setData([]);
				setLoading(false);
				console.log(err);
			}
		)
	}

	useEffect(() => {
		get();
	}, []);

	return (
		<TablaContainer>
			<DataGrid 
				components={{ 
					Toolbar: CustomToolbar,
					NoRowsOverlay: CustomNoRows,
				}}
				rowHeight={40}
				localeText={esES.components.MuiDataGrid.defaultProps.localeText}
				rows={data}
				columns={columns} 
				autoPageSize
				disableSelectionOnClick
				disableColumnMenu
				loading={loading}
			/>
		</TablaContainer>
	)
}

export default TablaUsuariosComponent