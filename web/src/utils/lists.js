export const generos = [
	{ id: 1, name: 'Femenino' },
	{ id: 2, name: 'Masculino' },
	{ id: 3, name: 'Otro' },
]

export const initialClient = {
	id:null,
	name:'',
	lastName:'',
	rut:'',
	birthday:'',
	gender:'',
	mail:'',
	phone:'',
	adress:'',
	comuna:'',
}

export const clientError = {
	name:false,
	lastName:false,
	rut:false,
	birthday:false,
	gender:false,
	mail:false,
	phone:false,
	adress:false,
	comuna:false,
}

export const initialTratamiento = {
	id:null,
	name:'',
	time:'',
	color:'#000000',
}

export const daysName = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export const daysNameSideBar = ['D', 'L', 'M', 'X', 'J', 'V', 'S',]

export const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']