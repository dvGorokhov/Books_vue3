import { createStore } from "vuex";
import test from './modules/test'
import singIn from './modules/singIn'

export default createStore({
  modules: {
    test, singIn
  },
  state() {
    return {
      role: 'guest',
      user: null
    }
  }
});