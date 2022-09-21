import React from 'react'
import { Navigate } from 'react-router-dom'
import { isLogin } from '../utils/auth'

const PrivateRoute = ({ children }) => {   
	const aux = isLogin();
	if (!aux) {
		// not logged in so redirect to login page with the return url
		return <Navigate to="/login"/>
	}

	// authorized so return child components
	return children;
}

export default PrivateRoute