import dayjs from 'dayjs'

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

export const tratamientoError = {
	name:false,
	time:false,
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
	client:null,
	tratamiento:'',
	box:'',
	date:dayjs(new Date()).format('YYYY-MM-DD'),
	time1:'',
	time2:'',
}

export const eventError = {
	date:false,
}

export const daysName = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export const daysNameSideBar = ['D', 'L', 'M', 'X', 'J', 'V', 'S',]

export const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
export const horasWeek = [
	{id:0,hora:'08', minuto:'00',},
	{id:1,hora:'08', minuto:'30',},
	{id:2,hora:'09', minuto:'00',},
	{id:3,hora:'09', minuto:'30',},
	{id:4,hora:'10', minuto:'00',},
	{id:5,hora:'10', minuto:'30',},
	{id:6,hora:'11', minuto:'00',},
	{id:7,hora:'11', minuto:'30',},
	{id:8,hora:'12', minuto:'00',},
	{id:9,hora:'12', minuto:'30'},
	{id:10,hora:'13', minuto:'00'},
	{id:11,hora:'13', minuto:'30'},
	{id:12,hora:'14', minuto:'00'},
	{id:13,hora:'14', minuto:'30'},
	{id:14,hora:'15', minuto:'00'},
	{id:15,hora:'15', minuto:'30'},
	{id:16,hora:'16', minuto:'00'},
	{id:17,hora:'16', minuto:'30'},
	{id:18,hora:'17', minuto:'00'},
	{id:19,hora:'17', minuto:'30'},
	{id:20,hora:'18', minuto:'00'},
	{id:21,hora:'18', minuto:'30'},
	{id:22,hora:'19', minuto:'00'},
	{id:23,hora:'19', minuto:'30'},
	{id:24,hora:'20', minuto:'00'},
	{id:25,hora:'20', minuto:'30'},
]