export const logIn = (token) => {
	console.log(token);
	window.localStorage.setItem('access-token', token)
}

export const logOut = () => {
	window.localStorage.removeItem('access-token')
}

export const isLogin = () => {
	const usuario = window.localStorage.getItem('access-token')
  	if (usuario !== null) return true;
  	else return false;
}