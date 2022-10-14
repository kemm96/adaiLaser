import React from 'react'
import styled from 'styled-components'
import NavBarComponent from './NavBar'

/***** Component style *****/
const Container = styled.div`
	width:100%;
	height: 94vh;
`
/****** ******************** *****/

const LayoutComponent = ({ children }) => {

	return (
		<React.Fragment>
			<NavBarComponent/>
			<Container>
				{children}
			</Container>
		</React.Fragment>
	)
}

export default LayoutComponent