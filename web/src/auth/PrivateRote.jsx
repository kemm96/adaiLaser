import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {   
	const usuario = window.localStorage.getItem('access-token') 
	console.log(usuario);
	if (usuario !== null) {
		// authorized so return child components
		return children;
		
	}
	// not logged in so redirect to login page with the return url
	return <Navigate to="/login"/>
	
}

export default PrivateRoute