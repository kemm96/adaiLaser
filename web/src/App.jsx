import React from 'react'
import styled from 'styled-components'
import GlobalStyle from './styles/globalStyle'
import { PageContainer } from './styles/style'
import { HashRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './auth/PrivateRote'
import Login from './pages/Login'
import Home from './pages/Home'

/***** Component style *****/

/****** ******************** *****/

const App = () => {
	return (
		<React.Fragment>
			<GlobalStyle/>
			<PageContainer>
				<HashRouter>
					<Routes>
						<Route exact path='/login' element={<Login/>}/>
						<Route exact path='/' element={<PrivateRoute><Home/></PrivateRoute>}/>
					</Routes>
				</HashRouter>
			</PageContainer>
		</React.Fragment>
	)
}

export default App