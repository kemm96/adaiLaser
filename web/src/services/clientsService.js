import API from './config'

const ClientsService = {
	list: () => new Promise(
		(resolve, reject) => {
			API.get('/clientes')
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
	post: (cliente) => new Promise(
		(resolve, reject) => {
			API.post('/clientes',cliente)
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
	history: (id) => new Promise(
		(resolve, reject) => {
			API.get(`/clientes/history/${id}`)
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

export default ClientsService