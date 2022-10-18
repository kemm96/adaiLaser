import styled from 'styled-components'

export const BoxShadow = styled.div`
	display:flex;
	-webkit-box-shadow: 0px 4px 10px -3px rgba(117, 117, 117, 1);
  	-moz-box-shadow: 0px 4px 10px -3px rgba(117, 117, 117, 1);
 	box-shadow: 0px 4px 10px -3px rgba(117, 117, 117, 1);
 	-webkit-box-shadow: 0px 6px 11px -8px #000000;
  	-moz-box-shadow: 0px 6px 11px -8px #000000;
  	box-shadow: 0px 6px 11px -8px #000000;
`
export const TablaContainer = styled.div`
	width: 90%;
	height: 90%;
	& .header {
		font-size:1rem;
		font-weight: bold;
		background-color:#1976D2;
		color:#ffffff;
	}
	& .cell div{
		width:100%;
		text-align:center;
	}
`
export const CustomNoRowsContainer = styled.div`
	width: 100%;
	height: 100%;
	display:flex;
	align-items:center;
	justify-content:center;
	font-size:1.2rem;
`
export const CustomToolbarContainer = styled.div`
	display:flex;
	align-items:center;
	padding:.5rem;
	justify-content:space-between;
`