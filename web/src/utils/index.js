import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import { horas } from './lists';

export const logIn = (token) => {
	window.localStorage.setItem('access-token', token);
	window.location.href = '/#/';
	window.location.reload();
}

export const logOut = () => {
	window.localStorage.removeItem('access-token');
	window.location.href = '/#/login';
	window.location.reload();
}

export const isLogin = () => {
	const token = window.localStorage.getItem('access-token')
  	if (token !== null) return true;
  	else return false;
}

export const getTokenData = () => {
	if(isLogin()){
		const token = window.localStorage.getItem('access-token')
		const decoded = jwt_decode(token);
		return decoded
	}else{
		return null
	}
} 

export const validaciones = (name, value) => {
	if(name === 'name' || name === 'lastName' || name === 'comuna'){
		return !/[^A-Za-zÄËÏÖÜäëïöüÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÑñ\s]/.test(value);
	}else if (name === 'phone'){
		return /^[0-9]{9}$/.test(value)
	}else if(name === 'mail'){
		return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(value);
	}else if(name === 'rut'){
		return /^[0-9]{7,8}-[0-9Kk]{1}$/.test(value)
	}else if(name === 'birthday' || name === 'date'){
		return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value)
	}else if(name === 'adress'){
		return !/[^0-9A-Za-zÄËÏÖÜäëïöüÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÑñ#°\s]/.test(value);
	}else if (name === 'time'){
		return /^[0-9]{0,5}$/.test(value)
	}else{
		return true
	}
}

export const getMonth = (month, year) => {
	const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
	let currentMonthCount = 1 - firstDayOfTheMonth;
	
	let daysMatrix = new Array(6).fill([]).map(() => {
		return new Array(7).fill(null).map(() => {
			let aux = dayjs(new Date(year, month, currentMonthCount));
		  	currentMonthCount++;
		  return aux
		});
	});  
	return daysMatrix;
}

export const getWeek = (week) => {
	dayjs.extend(weekday); 

	let daysMatrix = new Array(7).fill(null).map(() => {
		let aux = dayjs().weekday(week);
		week++;
		return aux
	});
	return daysMatrix;
}

export const getInit = (hora) => {
	const aux = hora.split(':')
	const horaFind = horas.find(({ hora }) => hora === aux[0]);
	let init = 0;
	let minutes = parseInt(aux[1]) || 0;
	if (horaFind) {
		if(minutes >= 30){
			init = horaFind.id + 1;
			minutes = minutes - 30;
		}else{
			init = horaFind.id;
		}	
	}

	const respond =  ((init * 3) + (minutes * 0.1));

	return respond
}

export const getEnd = (init, end) => {
	const aux = init.split(':')
	const aux2 = end.split(':')
	const minutes1 = (parseInt(aux[0]) * 60) + parseInt(aux[1]);
	const minutes2 = (parseInt(aux2[0]) * 60) + parseInt(aux2[1]);
	
	const respond =  ((minutes2 - minutes1) * 0.1);
	
	return respond
}