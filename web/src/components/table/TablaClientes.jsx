import React, { useState, useEffect, useContext} from 'react'
import styled from 'styled-components'
import { Button } from '@mui/material';
import { DataGrid, esES, GridToolbarFilterButton, GridActionsCellItem, GridToolbarExport, GridToolbarColumnsButton } from '@mui/x-data-grid'
import ClientsService from '../../services/clientsService'
import { Add, Visibility, History } from '@mui/icons-material'
import { ClientContext } from '../../context/ClientContext'
import { initialClient } from '../../utils/lists'

/***** Component style *****/
const Container = styled.div`
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
	font-size:1.2rem;
`
const CustomToolbarContainer = styled.div`
	display:flex;
	align-items:center;
	padding:.5rem;
	justify-content:space-between;
`
/****** ******************** *****/
const CustomNoRows = () => {
	return (
		<CustomNoRowsContainer>No hay clientes disponibles</CustomNoRowsContainer>
	);
}

const TablaClientesConponent = (props) => {
	const { setCliente, setEdit, render } = useContext(ClientContext)

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const handleOpenClient = (id) => {
		const aux = data.find(cliente => cliente.id === id);
		if(aux){
			setEdit(false);
			setCliente(aux);
			props.handleOpenClient();
		}else{
			setEdit(true);
			setCliente(initialClient);
			props.handleOpenClient();
		}
	};

	const handleOpenHistorial = (id) => {
		props.handleOpenHistorial(id);
	};

	// Obtine el nombre del cliente segun el id
	const getNombre = (id) => {
		const aux = data.find(cliente => cliente.id === id);
		if(aux){
			return aux.name + ' ' + aux.lastName
		}
		return 'usuario'
	}
	
	const CustomToolbar = () => {
		return (
			<CustomToolbarContainer>
				<div>
					<GridToolbarColumnsButton title='Columnas'/>
					<GridToolbarFilterButton title='Filtros'/>
					<GridToolbarExport 
						title='Exportar' 
						printOptions={{ disableToolbarButton: true }}
						csvOptions={{
							fileName: 'ClientesAdaiLaser',
							utf8WithBom: true,
							allColumns: true,
						 }}
					/>
				</div>
				<div>
					<Button title='Agregar Cliente' onClick={() => handleOpenClient(0)} startIcon={<Add/>}>Agregar Cliente</Button>
				</div>
			</CustomToolbarContainer>
		);
	}

	const columns = [
		{ field: 'lastName', headerName: 'Apellidos',flex: 1, hideable: false, headerClassName: 'header',},
		{ field: 'name', headerName: 'Nombres',flex: 1, hideable: false, headerClassName: 'header',},
		{ field: 'rut', headerName: 'R.U.T.', flex: 1, hideable: false, headerClassName: 'header', cellClassName:'cell', headerAlign: 'center', maxWidth:150,},
		{ field: 'birthday', headerName: 'Fecha de Nacimiento', flex: 1, headerClassName: 'header', cellClassName:'cell', headerAlign: 'center', maxWidth:180,},
		{ field: 'genderName', headerName: 'Género', flex: 1, headerClassName: 'header', cellClassName:'cell', headerAlign: 'center', maxWidth:150,},
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
						onClick={() => handleOpenClient(id)}
						label={`Ver Información de ${getNombre(id)}`}
						title={`Ver Información de ${getNombre(id)}`}
					/>,
					<GridActionsCellItem
						icon={<History/>}
						onClick={() => handleOpenHistorial(id)}
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
	}, [render]);

  	return (
		<Container>
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
				initialState={{
					...data.initialState,
					columns: {
					  columnVisibilityModel: {
							genderName:false,
					  },
					},
				}}
			/>
		</Container>
  	);
}

export default TablaClientesConponent