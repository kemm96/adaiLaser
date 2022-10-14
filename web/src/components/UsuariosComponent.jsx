import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DataGrid, esES, GridToolbarFilterButton, GridActionsCellItem, GridToolbarExport, GridToolbarColumnsButton } from '@mui/x-data-grid'
import { Edit, Delete } from '@mui/icons-material'
import UserService from '../services/userService'

/***** Component style *****/
const UsuariosContainer = styled.div`
	width: 100%;
	height: 100%;
	display:flex;
	justify-content:center;
	align-items:center;
	font-size:1.2rem;
`
const TablaContainer = styled.div`
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
/****** ******************** *****/

const CustomNoRows = () => {
		return (
			<UsuariosContainer>No hay usuarios disponibles</UsuariosContainer>
		);
	}

const UsuariosComponent = () => {

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

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
						icon={<Edit/>}
						label='Editar'
						title='Editar'
					/>,
					<GridActionsCellItem
						icon={<Delete/>}
						label='Eliminar'
						title='Eliminar'
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
		<UsuariosContainer>
			<TablaContainer>
				<DataGrid 
					components={{
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
		</UsuariosContainer>
	)
}

export default UsuariosComponent