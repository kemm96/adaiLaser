import React from 'react'
import { Navigate } from 'react-router-dom'
import { getTokenData, isLogin } from '../utils'

const PrivateRoute = ({ children, needAdmin }) => {   
	const aux = isLogin();
	if (!aux) {
		// not logged in so redirect to login page with the return url
		return <Navigate to="/login"/>
	}

	if(needAdmin){
		const token = getTokenData()
		if(token.user.rol === 1){
			// authorized so return child components
			return children;	
		}else{
			// not authorized in so redirect to login page with the return url
			return <Navigate to="/#"/>
		}
	}else{
		// logged so return child components
		return children;
	}
}

export default PrivateRoute