import API from './config'

const TratamientosService = {
	list: () => new Promise(
		(resolve, reject) => {
			API.get('/tratamientos')
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
}

export default TratamientosService