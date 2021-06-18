import axios from 'axios'
import config from '../config'

const { base_url } = config

// console.log(base_url);
// export function request(config) {
//     const instance = axios.create({
//         baseURL: 'http://localhost:3000',
//         timeout: 1000 * 60
//     })
//     return instance(config)
// }
export function request(config) {
	const instance = axios.create({
		baseURL: base_url,
		timeout: 1000 * 60
	})

	instance.interceptors.response.use(
		res => {
			let data = res.data
			let status = res.status
			if (status === 200) {
				return data
			} else if (status === 301) {
				this.$message.error('请先登录!')
				this.$router.replace('/login')
			}
		},
		err => {
			console.log(err);
		}
	)

	return instance[config.type](config.url, { params: config.params })
}
