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

export const validaciones = (name, value) => {
	if(name === 'name' || name === 'lastName' || name === 'comuna'){
		return !/[^A-Za-zÄËÏÖÜäëïöüÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÑñ\s]/.test(value);
	}else if (name === 'phone'){
		return /^[0-9]{9}$/.test(value)
	}else if(name === 'mail'){
		return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(value);
	}else if(name === 'rut'){
		return /^[0-9]{7,8}-[0-9Kk]{1}$/.test(value)
	}else if(name === 'birthday'){
		return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value)
	}else if(name === 'adress'){
		return !/[^0-9A-Za-zÄËÏÖÜäëïöüÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÑñ#°\s]/.test(value);
	}else{
		return true
	}
}