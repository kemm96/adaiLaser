import React, { createContext, useState } from 'react'
import { initialTratamiento } from '../utils/lists';

export const AdministracionContext = createContext({
	tratamiento: {}, 
	setTratamiento: (i) => {},
})

// Context Wrapper
export const AdministracionContextWrapper = ({ children }) => {
	
	const[tratamiento, setTratamiento] = useState(initialTratamiento)

	return (
		<AdministracionContext.Provider value={{
			tratamiento, 
			setTratamiento,
		}}>
			{children}
		</AdministracionContext.Provider>
	)
}