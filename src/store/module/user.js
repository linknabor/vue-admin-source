import { login, logout, getUserInfo } from '@/api/user'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    userName: '',
    userId: '',
    avatorImgPath: 'https://avatars3.githubusercontent.com/u/32168640?s=40&v=4',
    token: getToken(),
    access: ''
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, {userName, password,code}) {
      userName = userName.trim()
      console.log(5)
      return new Promise((resolve, reject) => {
        login({
          userName,
          password,
          code
        }).then(res => {
          // console.log(6)
          const data = res.data;
          // console.log(data);
          // if(data.success==false){
          //   // alert(data.message);
          //   resolve(data)
          //   // window.location.reload()
          //   // return
          // }
          // commit('setToken', data.result.token);
          resolve(data)
        }).catch(err => {
           // window.location.reload()
          // console.log(66)
          reject(err)
        })
      })
    },
    // handleLogin ({ commit }, {userName, password}) {
    //   userName = userName.trim()
    //   return new Promise((resolve, reject) => {
    //     login({
    //       userName,
    //       password
    //     }).then(res => {
    //       const data = res.data
    //       commit('setToken', data.token)
    //       resolve()
    //     }).catch(err => {
    //       reject(err)
    //     })
    //   })
    // },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        //   commit('setToken', '')
        //   commit('setAccess', [])
        //   resolve()
        // }).catch(err => {
        //   reject(err)
        // })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        resolve()
      })
    },
    // handleLogOut ({ state, commit }) {
    //   return new Promise((resolve, reject) => {
    //     logout(state.token).then(() => {
    //       commit('setToken', '')
    //       commit('setAccess', [])
    //       resolve()
    //     }).catch(err => {
    //       reject(err)
    //     })
    //     // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
    //     // commit('setToken', '')
    //     // commit('setAccess', [])
    //     // resolve()
    //   })
    // },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(res => {
          const data = res.data;
          // console.log(data.userName)
          // commit('setAvator', data.avator)
          commit('setUserName', data.userName)
          // commit('setUserId', data.user_id)
          // commit('setAccess', data.access)
          resolve(data)
        }).catch(err => {
          // window.location.reload()
          reject(err)
        })
      })
    }
    // getUserInfo ({ state, commit }) {
    //   return new Promise((resolve, reject) => {
    //     getUserInfo(state.token).then(res => {
    //       const data = res.data
    //       commit('setAvator', data.avator)
    //       commit('setUserName', data.user_name)
    //       commit('setUserId', data.user_id)
    //       commit('setAccess', data.access)
    //       resolve(data)
    //     }).catch(err => {
    //       reject(err)
    //     })
    //   })
    // }
  }
}
