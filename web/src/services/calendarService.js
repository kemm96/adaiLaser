import API from './config'

const CalendarService = {
	selectList: () => new Promise(
		(resolve, reject) => {
			API.get('/calendar/list')
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
	post: (data) => new Promise(
		(resolve, reject) => {
			API.post('/calendar',data)
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
	list: (box, date) => new Promise(
		(resolve, reject) => {
			API.get(`/calendar/${box}/${date}`)
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
	getCita: (id) => new Promise(
		(resolve, reject) => {
			API.get(`/calendar/${id}`)
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

export default CalendarService