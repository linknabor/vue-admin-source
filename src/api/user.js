import axios from '@/libs/api.request'

// export const login = ({ userName, password }) => {
//   const data = {
//     userName,
//     password
//   }
//   return axios.request({
//     url: 'login',
//     data,
//     method: 'post'
//   })
// }
// export const getUserInfo = (token) => {
//   return axios.request({
//     url: 'get_info',
//     params: {
//       token
//     },
//     method: 'get'
//   })
// }
export const login = ({ userName, password ,code}) => {
  const data = {
    userName,
    password,
    code
  }
  console.log(data)
  let url = "http://192.168.0.101:9090/crm/index.html";
  return axios.request({
    url: '/sso/login',
    data:{
      tpSysName:'crm',
      userName:data.userName,
      password:data.password,
      veriCode:data.code,
      reqUrl:url
    },
    method: 'post'
  })
}
export const getUserInfo = (roleId) => {
  return axios.request({
    url: '/sso/getLoginUser',
    // params: {
    //   token,
    //   sessionId
    // },
    method: 'post'
  })
}
export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}
