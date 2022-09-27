import React from 'react'
import styled from 'styled-components'
import NavBarComponent from './NavBar'

/***** Component style *****/
const ChildrenContainer = styled.div`
	width:100%;
	height: 94vh;
`
/****** ******************** *****/

const LayoutComponent = ({ children }) => {

	return (
		<React.Fragment>
			<NavBarComponent/>
			<ChildrenContainer>
				{children}
			</ChildrenContainer>
		</React.Fragment>
	)
}

export default LayoutComponent