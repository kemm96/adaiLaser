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

export const initialUser = {
	id:null,
	name:'',
	rut:'',
	phone:'',
	mail:'',
	rol:2,
}

export const userError = {
	name:false,
	rut:false,
	phone:false,
	mail:false,
	rol:false,
}

export const initialEvent = {
	id:null,
	user:'',
	client:'',
	tratamiento:'',
	box:'',
	date:'',
	time1:'',
	time2:'',
	description:'',
}

export const daysName = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export const daysNameSideBar = ['D', 'L', 'M', 'X', 'J', 'V', 'S',]

export const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']