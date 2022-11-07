import styled from 'styled-components'

export const FlexContainer = styled.div`
	display:flex;
	justify-content:center;
	align-items:center;
`
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
export const CustomNoRowsContainer = styled(FlexContainer)`
	width: 100%;
	height: 100%;
	font-size:1.2rem;
`
export const CustomToolbarContainer = styled.div`
	display:flex;
	align-items:center;
	padding:.5rem;
	justify-content:space-between;
`
export const DialogBar = styled(BoxShadow)`
	height:6vh;
	width:100%;
	align-items:center;
	justify-content:space-between;
	padding: 0 5%;
	background-color:#1976D2;
	& button{
		color:#ffffff;
		transform:scale(1.2);
		:hover{
			background-color:#ffffff33;
		}
	}
	& span{
		color:#ffffff;
		font-size:1.2rem;
	}
`
export const DialogFooter = styled(FlexContainer)`
	width:100%;
	padding:.5rem;
	border-top: 1px solid #e0e0e0;
	button{
		color:#1976D2;
		:hover{
			background-color:#1976D233;
		}
	}
`