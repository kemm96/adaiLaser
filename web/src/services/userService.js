import API from './config'

const UserService = {
	list: () => new Promise(
		(resolve, reject) => {
			API.get('/user')
			.then(
				res => {
					if (res.data.error) {
						reject(res)
					}else{
						resolve(res.data.body)
					}
				}
			).catch(
				err => reject(err)
			)
		}
	),
}

export default UserService