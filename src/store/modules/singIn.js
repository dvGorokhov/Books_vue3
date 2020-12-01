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
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: "http://127.0.0.1:8000/api/auth/reg", data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.access_token
            const user = resp.data.user
            const role = resp.data.role
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = 'Bearer' + token
            commit('auth_success', { token, user, role })
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    getUserRole({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: "http://127.0.0.1:8000/api/auth/login", data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.access_token
            const user = resp.data.user
            const role = resp.data.role
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = 'Bearer' + token
            commit('auth_success', { token, user, role })
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout({ commit }) {
      axios
        .post("http://127.0.0.1:8000/api/auth/logout")
        .then(function () {
          commit('logout')
          localStorage.removeItem("token");
        })
        .catch(function (err) {
          console.log(err);
        });
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
    logout(state) {
      state.status = ''
      state.token = ''
      state.role = 'guest'
      state.user = {}
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