import axios from "axios";

export default {

  state: {
    role: 'guest',
    status: '',
    user: {},
    token: localStorage.getItem('token') || '',
    login: "",
    pass: "",
  },
  actions: {
    getUserRole({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: "http://127.0.0.1:8000/api/auth/login", data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.access_token
            const user = resp.data.user
            const role = resp.data.role
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', { token, user, role })
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    }
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_error(state) {
      state.status = 'error'
    },
    auth_success(state, { token, user, role }) {
      state.status = 'success'
      state.token = token
      state.user = user
      state.role = role
    },
  },
  getters: {
    isLoggedIn: state => !!state.token,
    userNow: state => state.user,
    roleNow: state => state.role,
    loginNow: state => state.login,
    passNow: state => state.pass

  }
}