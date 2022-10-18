import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from '@mui/material';
import { DataGrid, esES, GridActionsCellItem } from '@mui/x-data-grid'
import TratamientosService from '../../services/tratamientosService'
import { Edit, Delete, Add } from '@mui/icons-material'
import { AdministracionContext } from '../../context/AdministracionContext'
import { initialTratamiento } from '../../utils/lists';
import ConfirmationComponent from '../dialog/Confirmation';

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
const ColorContainer = styled.div`
	background-color:${props => props.color || ''};
	display:flex;
	justify-content:center;
	height:60%;
	width:50%;
`
const CustomToolbarContainer = styled.div`
	display:flex;
	align-items:center;
	padding:.5rem;
	justify-content:flex-end;
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
			props.handleOpenTratamientos()
		}else{
			setTratamiento(initialTratamiento);
			props.handleOpenTratamientos()
		}
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

	// Obtine el nombre del cliente segun el id
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
				<Button title='Agregar Tratamiento' onClick={() => handleOpenTratamiento(0)} startIcon={<Add/>}>Agregar Tratamiento</Button>
			</CustomToolbarContainer>
		);
	}

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
			renderCell:({ formattedValue }) => (Color(formattedValue))},
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
		<Container>
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
		</Container>
	)

	
}

export default TablaTratamientosComponent