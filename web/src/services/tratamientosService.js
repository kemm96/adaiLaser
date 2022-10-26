import API from './config'

const TratamientosService = {
	list: () => new Promise(
		(resolve, reject) => {
			API.get('/tratamientos')
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
	post: (tratamiento) => new Promise(
		(resolve, reject) => {
			API.post('/tratamientos',tratamiento)
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
			API.delete(`/tratamientos/${id}`)
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

export default TratamientosService