import React from 'react'
import styled from 'styled-components'
import GlobalStyle from './styles/globalStyle'
import { HashRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './auth/PrivateRote'
import Login from './pages/Login'
import Home from './pages/Home'
import Calendario from './pages/Calendario'
import Clientes from './pages/Clientes'

/***** Component style *****/
const AppContainer = styled.div`
	width: 100vw;
	height: 100vh;
`
/****** ******************** *****/

const App = () => {
	return (
		<React.Fragment>
			<GlobalStyle/>
			<AppContainer id='appContainer'>
				<HashRouter>
					<Routes>
						<Route exact path='/login' element={<Login/>}/>
						<Route exact path='/' element={<PrivateRoute><Home/></PrivateRoute>}/>
						<Route exact path='/calendario' element={<PrivateRoute><Calendario/></PrivateRoute>}/>
						<Route exact path='/clientes' element={<PrivateRoute><Clientes/></PrivateRoute>}/>
					</Routes>
				</HashRouter>
			</AppContainer>
		</React.Fragment>
	)
}

export default App