import React, { useState, useEffect} from 'react'
import styled from 'styled-components'
import { Button } from '@mui/material';
import { DataGrid, esES, GridToolbarFilterButton, GridActionsCellItem, GridToolbarExport, GridToolbarColumnsButton } from '@mui/x-data-grid'
import ClientsService from '../services/clientsService'
import { Add, Visibility, History } from '@mui/icons-material'

/***** Component style *****/
const TableContainer = styled.div`
	width: 90%;
	height: 90%;
	& .header {
		font-size:1rem;
		font-weight: bold;
		background-color:#1976D2;
		color:#ffffff;
	}
	& .cell div{
		width:100%;
		text-align:center;
	}
`
const CustomNoRowsContainer = styled.div`
	width: 100%;
	height: 100%;
	display:flex;
	align-items:center;
	justify-content:center;
	font-size:1.5rem;
`
const CustomToolbarContainer = styled.div`
	position:relative;
	display:flex;
	align-items:center;
	padding:.5rem;
	justify-content:space-between;
	& div button{
		color:#1976D2;
		:hover{
			background-color:#1976D233;
		}
	}
`
/****** ******************** *****/

const TablaClientesConponent = (props) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const handleOpenDialog = (id) => {
		const user = data.find(cliente => cliente.id === id);
		if(user){
			props.handleOpenDialog(user);
		}else{
			props.handleOpenDialog(false);
		}
	};

	const CustomToolbar = () => {
		return (
			<CustomToolbarContainer>
				<div>
					<GridToolbarColumnsButton title='Columnas'/>
					<GridToolbarFilterButton title='Filtros'/>
					<GridToolbarExport title='Exportar' printOptions={{ disableToolbarButton: true }}/>
				</div>
				<div>
					<Button title='Agregar Cliente' onClick={() => handleOpenDialog(0)} startIcon={<Add/>}>Agregar Cliente</Button>
				</div>
			</CustomToolbarContainer>
		);
	}

	const CustomNoRows = () => {
		return (
			<CustomNoRowsContainer>No existen Usuarios</CustomNoRowsContainer>
		);
	}

	// Obtine el nombre del cliente segun el id
	const getNombre = (id) => {
		const user = data.find(cliente => cliente.id === id);
		if(user){
			return user.name + ' ' + user.lastName
		}
		return 'usuario'
	}

	const columns = [
		{ field: 'lastName', headerName: 'Apellidos',flex: 1, hideable: false, headerClassName: 'header',},
		{ field: 'name', headerName: 'Nombres',flex: 1, hideable: false, headerClassName: 'header',},
		{ field: 'age', headerName: 'Edad', flex: 1, hideable: false, headerClassName: 'header', cellClassName:'cell', headerAlign: 'center', maxWidth:150,},
		{ field: 'rut', headerName: 'R.U.T.', flex: 1, hideable: false, headerClassName: 'header', cellClassName:'cell', headerAlign: 'center', maxWidth:150,},
		{ field: 'mail', headerName: 'Email', flex: 1, headerClassName: 'header',},
		{ field: 'phone', headerName: 'Teléfono', flex: 1, headerClassName: 'header', cellClassName:'cell', headerAlign: 'center', maxWidth:150,},
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
						icon={<Visibility/>}
						onClick={() => handleOpenDialog(id)}
						label={`Ver Información de ${getNombre(id)}`}
						title={`Ver Información de ${getNombre(id)}`}
					/>,
					<GridActionsCellItem
						icon={<History/>}
						label={`Ver Historial de ${getNombre(id)}`}
						title={`Ver Historial de ${getNombre(id)}`}
					/>
				]
			},
		}
	];

	const get = async() => {
		setLoading(true);
		await ClientsService.list()
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
		<TableContainer id='hola'>
			<DataGrid 
				rowHeight={40}
				components={{ 
					Toolbar: CustomToolbar,
					NoRowsOverlay: CustomNoRows,
				}}
				localeText={esES.components.MuiDataGrid.defaultProps.localeText}
				rows={data}
				columns={columns}
				autoPageSize
				disableSelectionOnClick
				disableColumnMenu
				loading={loading}
			/>
		</TableContainer>
  	);
}

export default TablaClientesConponent