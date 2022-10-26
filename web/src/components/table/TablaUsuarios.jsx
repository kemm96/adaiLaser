import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from '@mui/material';
import { DataGrid, esES, GridActionsCellItem, GridToolbarFilterButton } from '@mui/x-data-grid'
import { Add, Settings } from '@mui/icons-material'
import UserService from '../../services/userService'
import { CustomNoRowsContainer, CustomToolbarContainer, TablaContainer } from '../../styles/styles'
import { AdministracionContext } from '../../context/AdministracionContext';
import { initialUser } from '../../utils/lists';

/***** Component style *****/

/****** ******************** *****/

const Rol = (rol) => {
	return rol === 1 ? 'Administrador' : 'Funcionario'
}

const CustomNoRows = () => {
		return (
			<CustomNoRowsContainer>No hay usuarios disponibles</CustomNoRowsContainer>
		);
	}

const TablaUsuariosComponent = (props) => {
	const { setUser, render } = useContext(AdministracionContext)

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const handleOpenUsuario = (id) => {
		const aux = data.find(user => user.id === id);
		if(aux){
			setUser(aux);
		}else{
			setUser(initialUser);
		}
		props.handleOpenUsers()
	}

	// Obtine el nombre del usuario segun el id
	const getNombre = (id) => {
		const aux = data.find(user => user.id === id);
		if(aux){
			return aux.name
		}
		return 'usuario'
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
		{ field: 'mail', headerName: 'Correo',flex: 1, headerClassName: 'header',},
		{ 
			field: 'rol', 
			headerName: 'Rol',
			flex: 1, 
			headerClassName: 'header', 
			cellClassName:'cell', 
			maxWidth:150,
			renderCell:({ formattedValue }) => (Rol(formattedValue))
		},
		{
			field: 'options',
			type: 'actions',
			headerName: 'Opciones',
			flex: 1,
			maxWidth:100,
			headerClassName: 'header',
			getActions: ({ id }) => {
				return [
					<GridActionsCellItem
						icon={<Settings/>}
						label={`Configuración ${getNombre(id)}`}
						title={`Configuración ${getNombre(id)}`}
						onClick={() => handleOpenUsuario(id)}
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
	}, [render]);

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