import React, { useEffect } from 'react'
import styled from 'styled-components'

/***** Component style *****/
const UsuariosContainer = styled.div`
	background-color:yellow;
`
/****** ******************** *****/

const UsuariosComponent = () => {

	useEffect(() => {
		console.log('hola');
	}, []);

	return (
		<UsuariosContainer>Usuarios</UsuariosContainer>
	)
}

export default UsuariosComponent