let base_url = ''
if (process.env.NODE_ENV === 'development') {
  base_url = 'http://localhost:3000'
} else if (process.env.NODE_ENV === 'production') {
  base_url = 'http://110.42.138.85/'
}
export default {
  base_url
}
