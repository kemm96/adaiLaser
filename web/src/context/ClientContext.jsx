import React, { createContext, useState } from 'react'
import { initialClient } from '../utils/lists';

export const ClientContext = createContext({
	cliente: {}, 
	setCliente: (i) => {},
	edit: {}, 
	setEdit: (i) => {},
	getClientes:{},
	setGetClientes: (i) => {},
})

// Context Wrapper
export const ClientContextWrapper = ({ children }) => {
	
	const [cliente, setCliente] = useState(initialClient);
	const [edit, setEdit] = useState(true);
	const [getClientes, setGetClientes] = useState(true);

	return (
		<ClientContext.Provider value={{
			cliente, 
			setCliente,
			edit, 
			setEdit,
			getClientes,
			setGetClientes
		}}>
			{children}
		</ClientContext.Provider>
	)
}