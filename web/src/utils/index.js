import jwt_decode from 'jwt-decode'

export const logIn = (token) => {
	window.localStorage.setItem('access-token', token);
	window.location.href = '/#/';
}

export const logOut = () => {
	window.localStorage.removeItem('access-token');
	window.location.href = '/#/login';
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

export const getAge = (value) => {
	const date1 = new Date(value);
	const date1Utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
	const date2 = new Date;
	const date2Utc = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
	const day = 1000*60*60*24;
	const aux = ((date2Utc - date1Utc)/day)
	if(aux.toString() === 'NaN'){
		return 0
	}else{
		return Math.trunc(aux/365) 
	}
}

export const validaciones = (name, value) => {
	if(name === 'name' || name === 'lastName'){
		return !/[^A-Za-zÄËÏÖÜäëïöüÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÑñ\s]/.test(value);
	}else if (name === 'phone'){
		return /^[0-9]{9}$/.test(value)
	}else if(name === 'mail'){
		return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(value);
	}else if(name === 'rut'){
		return /^[0-9]{7,8}-[0-9Kk]{1}$/.test(value)
	}else if(name === 'birthday'){
		console.log(value);
		return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value)
	}
}