import React, { useState} from 'react'
import styled from 'styled-components'
import LayoutComponent from '../components/layout/Layout'
import TablaClientesComponent from '../components/TablaClientes'
import AddClientDialog from '../components/ClientDialog'
import ClientsService from '../services/clientsService'
import { getAge, initialClient } from '../utils'

/***** Component style *****/
const ClientsContainerer = styled.div`
	width: 100%;
	height: 100%;
	display:flex;
	align-items:center;
	justify-content:center;
`
/****** ******************** *****/

const Clientes = () => {
	const [cliente, setCliente] = useState(initialClient);
	const [openDialog, setOpenDialog] = useState(true);
	const [newClient, setNewClient] = useState(true);
	const [edit, setEdit] = useState(false);
	const [error, setError]= useState(false)

	const updateCliente = (name, value) => {
		if(name === 'name' || name === 'lastName' ||name === 'rut' || name === 'birthday' || name === 'gender'){
			setError(false)
		}
		if(name === 'birthday'){
			let age = getAge(value);
			setCliente({
				...cliente,
				[name]: value,
				'age': age > 0 ? age : 0,
			});
		}else{
			setCliente({
				...cliente,
				[name]: value,
			});
		}
	}

	const handleOpenDialog = (e) => {
		if(e){
			setNewClient(false)
			setCliente(e)
		}else{
			setNewClient(true)
			setCliente(initialClient)
		}
		setOpenDialog(true);
	};
	
	const handleCloseDialog = () => {
		setOpenDialog(false);
		setEdit(false);
		setError(false);
	};

	const handleEdit = () => {
		setEdit(!edit);
	}

	const handleSend = async() => {
		if(cliente.name === '' || cliente.lastName === '' || cliente.rut === '' || cliente.birthday === '' || cliente.gender === ''){
			setError(true)
		}else{
			await ClientsService.postUser(cliente)
			.then(
				res => {
					setOpenDialog(false);
					setEdit(false);
				}
			).catch(
				err => {
					console.log(err);
				}
			)
		}
	};

	return (
		<LayoutComponent>
			<ClientsContainerer>
				<TablaClientesComponent 
					handleOpenDialog={handleOpenDialog}
				/>
				<AddClientDialog 
					open={openDialog} 
					updateCliente={updateCliente}
					handleCloseClient={handleCloseDialog} 
					handleEditClient={handleEdit}
					handleSendClient={handleSend}
					data={cliente} 
					newClient={newClient} 
					edit={edit}
					error={error}
				/>
			</ClientsContainerer>
		</LayoutComponent>
	)
}

export default Clientes