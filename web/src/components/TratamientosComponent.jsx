import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DataGrid, esES, GridToolbarFilterButton, GridActionsCellItem, GridToolbarExport, GridToolbarColumnsButton } from '@mui/x-data-grid'
import TratamientosService from '../services/tratamientosService'
import { Edit, Delete } from '@mui/icons-material';

/***** Component style *****/
const TratamientosContainer = styled.div`
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
const ColorPickerContainer = styled.div`
	background-color:${props => props.color || ''};
	display:flex;
	justify-content:center;
`
/****** ******************** *****/

const ColorPicker = (color) => {
	return <ColorPickerContainer color={color}>{color}</ColorPickerContainer>
}

const TratamientosComponent = () => {

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const columns = [
		{ field: 'name', headerName: 'Nombre',flex: 1, headerClassName: 'header',},
		{ field: 'time', headerName: 'Duración (minutos)',flex: 1, hideable: false, headerClassName: 'header', cellClassName:'cell', headerAlign: 'center',},
		{ 
			field: 'color', 
			headerName: 'Color', 
			flex: 1, hideable: false, 
			headerClassName: 'header', 
			cellClassName:'cell', 
			headerAlign: 'center', 
			maxWidth:150, 
			sortable: false ,
			renderCell:({ formattedValue }) => (ColorPicker(formattedValue))},
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

	const CustomNoRows = () => {
		return (
			<TratamientosContainer>No hay tratamientos disponibles</TratamientosContainer>
		);
	}

	const get = async() => {
		setLoading(true);
		await TratamientosService.list()
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
		<TratamientosContainer>
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
		</TratamientosContainer>
	)

	
}

export default TratamientosComponent