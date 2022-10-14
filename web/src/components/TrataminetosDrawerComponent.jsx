import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer'

const TrataminetosDrawerComponent = (props) => {

	const handleClose = () => ()  => {
		props.handleClose();
	};

	return (
		<div>
			<React.Fragment>
				<Drawer
					anchor='right'
					open={props.open}
					onClose={handleClose()}
				>
					hola
				</Drawer>
			</React.Fragment>
		</div>
	);
}

export default TrataminetosDrawerComponent