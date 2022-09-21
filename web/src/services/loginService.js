import API from './config'

const LoginService = {
	getToken: (user) => new Promise(
		(resolve, reject) => {
			API.post('/auth',user)
			.then(
				res => {
					if (res.data.error) {
						reject(err)
					}else{
						resolve(res.data.body)
					}
				}
			).catch(
				err => reject(err)
			)
		}
	)
}

export default LoginService