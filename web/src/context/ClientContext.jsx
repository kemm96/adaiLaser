import React, { createContext, useState } from 'react'
import { initialClient } from '../utils/lists';

export const ClientContext = createContext({
	cliente: {}, 
	setCliente: (i) => {},
	edit: {}, 
	setEdit: (i) => {},
	render:{},
	setRender: (i) => {},
})

// Context Wrapper
export const ClientContextWrapper = ({ children }) => {
	
	const [cliente, setCliente] = useState(initialClient);
	const [edit, setEdit] = useState(true);
	const [render, setRender] = useState(true);

	return (
		<ClientContext.Provider value={{
			cliente, 
			setCliente,
			edit, 
			setEdit,
			render,
			setRender
		}}>
			{children}
		</ClientContext.Provider>
	)
}