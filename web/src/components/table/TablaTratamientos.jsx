import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { CustomNoRowsContainer, CustomToolbarContainer, FlexContainer, TablaContainer } from '../../styles/styles';
import { Button } from '@mui/material';
import { DataGrid, esES, GridActionsCellItem, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid'
import TratamientosService from '../../services/tratamientosService'
import { Edit, Delete, Add } from '@mui/icons-material'
import { AdministracionContext } from '../../context/AdministracionContext'
import { initialTratamiento } from '../../utils/lists';
import ConfirmationComponent from '../dialog/Confirmation';

/***** Component style *****/
const ColorContainer = styled(FlexContainer)`
	background-color:${props => props.color || ''};
	height:60%;
	width:50%;
`
/****** ******************** *****/

const Color = (color) => {
	return <ColorContainer color={color}/>
}

const CustomNoRows = () => {
	return (
		<CustomNoRowsContainer>No hay tratamientos disponibles</CustomNoRowsContainer>
	);
}

const TablaTratamientosComponent = (props) => {
	const { setTratamiento, render, setRender } = useContext(AdministracionContext)

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [deleteConfirmation, setDeleteConfirmation] = useState({
		id:null,
		open:false,
		text:'',
	})

	const handleOpenTratamiento = (id) => {
		const aux = data.find(tratamiento => tratamiento.id === id);
		if(aux){
			setTratamiento(aux);
		}else{
			setTratamiento(initialTratamiento);
		}
		props.handleOpenTratamientos()
	}

	const handleOpenDeleteConfirmation = (id) => {
		setDeleteConfirmation({
			id:id,
			open:true,
			text:`eliminar tratamiento ${getNombre(id)}`,
		})
	}

	const handleCloseDeleteConfirmation = () => {
		setDeleteConfirmation({
			...deleteConfirmation,
			open:false,
		})
	}

	// Obtine el nombre del tratamineto segun el id
	const getNombre = (id) => {
		const aux = data.find(tratamiento => tratamiento.id === id);
		if(aux){
			return aux.name
		}
		return 'tratamiento'
	}

	const CustomToolbar = () => {
		return (
			<CustomToolbarContainer>
				<div>
					<GridToolbarFilterButton title='Filtros'/>
					<GridToolbarExport 
						title='Exportar' 
						printOptions={{ disableToolbarButton: true }}
						csvOptions={{
							fileName: 'TratamientosAdaiLaser',
							utf8WithBom: true,
							allColumns: true,
						}}
					/>
				</div>
				<div>
					<Button title='Agregar Tratamiento' onClick={() => handleOpenTratamiento(0)} startIcon={<Add/>}>Agregar Tratamiento</Button>
				</div>
			</CustomToolbarContainer>
		);
	}

	const columns = [
		{ field: 'name', headerName: 'Nombre',flex: 1, headerClassName: 'header',},
		{ field: 'time', headerName: 'Duración (minutos)',flex: 1, headerClassName: 'header', cellClassName:'cell', headerAlign: 'center',},
		{ 
			field: 'color', 
			headerName: 'Color', 
			flex: 1,
			headerClassName: 'header', 
			cellClassName:'cell', 
			headerAlign: 'center', 
			maxWidth:150, 
			sortable: false ,
			filterable: false,
			renderCell:({ formattedValue }) => (Color(formattedValue))
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
						icon={<Edit/>}
						label={`Editar ${getNombre(id)}`}
						title={`Editar ${getNombre(id)}`}
						onClick={() => handleOpenTratamiento(id)}
					/>,
					<GridActionsCellItem
						icon={<Delete/>}
						label={`Eliminar ${getNombre(id)}`}
						title={`Eliminar ${getNombre(id)}`}
						onClick={() => handleOpenDeleteConfirmation(id)}
					/>,
				]
			},
		}
	]

	const onDelete = async() => {
		await TratamientosService.delete(deleteConfirmation.id)
		.then(
			res => {
				setRender(!render)
			}
		).catch(
			err => {
				console.log(err);
			}
		)
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
			<ConfirmationComponent
				open={deleteConfirmation.open}
				onClose={handleCloseDeleteConfirmation}
				text={deleteConfirmation.text}
				confirmation={onDelete}
			/>
		</TablaContainer>
	)

	
}

export default TablaTratamientosComponent