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
}

export default CalendarService