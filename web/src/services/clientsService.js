import API from './config'

const ClientsService = {
	list: () => new Promise(
		(resolve, reject) => {
			API.get('/clientes')
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
	),
	postUser: (cliente) => new Promise(
		(resolve, reject) => {
			API.post('/clientes',cliente)
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

export default ClientsService