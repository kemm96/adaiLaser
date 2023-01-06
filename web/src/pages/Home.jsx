import React from 'react'
import styled from 'styled-components'
import LayoutComponent from '../components/layout/Layout'

/***** Component style *****/
const HomeContainer = styled.div`
	display:flex;
	width:100vw;
`
/****** ******************** *****/

const Home = () => {

	return (
		<LayoutComponent>
			<HomeContainer>
				En Construcción
			</HomeContainer>
		</LayoutComponent>
	)
}

export default Home