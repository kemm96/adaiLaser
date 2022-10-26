import React, { createContext, useState } from 'react'
import { initialTratamiento, initialUser } from '../utils/lists';

export const AdministracionContext = createContext({
	tratamiento: {}, 
	setTratamiento: (i) => {},
	user: {},
	setUser: (i) => {},
	render:{},
	setRender: (i) => {},
})

// Context Wrapper
export const AdministracionContextWrapper = ({ children }) => {
	
	const[tratamiento, setTratamiento] = useState(initialTratamiento);
	const[user, setUser] = useState(initialUser);
	const [render, setRender] = useState(true);

	return (
		<AdministracionContext.Provider value={{
			tratamiento, 
			setTratamiento,
			user,
			setUser,
			render,
			setRender
		}}>
			{children}
		</AdministracionContext.Provider>
	)
}