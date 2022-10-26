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
	post: (user, pass) => new Promise(
		(resolve, reject) => {
			API.post('/user',{user:user,pass:pass})
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
	delete: (id) => new Promise(
		(resolve, reject) => {
			API.delete(`/user/${id}`)
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
	)
}

export default UserService