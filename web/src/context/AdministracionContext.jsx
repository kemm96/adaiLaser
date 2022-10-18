import React, { createContext, useState } from 'react'
import { initialTratamiento } from '../utils/lists';

export const AdministracionContext = createContext({
	tratamiento: {}, 
	setTratamiento: (i) => {},
	render:{},
	setRender: (i) => {},
})

// Context Wrapper
export const AdministracionContextWrapper = ({ children }) => {
	
	const[tratamiento, setTratamiento] = useState(initialTratamiento);
	const [render, setRender] = useState(true);

	return (
		<AdministracionContext.Provider value={{
			tratamiento, 
			setTratamiento,
			render,
			setRender
		}}>
			{children}
		</AdministracionContext.Provider>
	)
}