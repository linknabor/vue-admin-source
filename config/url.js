import env from './env'
// const DEV_URL = 'https://www.easy-mock.com/mock/5add9213ce4d0e69998a6f51/iview-admin/'
// const DEV_URL = 'https://test.e-shequ.com/msa/sso/'
const DEV_URL = 'http://127.0.0.1/msa/'
const PRO_URL = 'https://test.e-shequ.com/msa/'
export default env === 'development' ? DEV_URL : PRO_URL
