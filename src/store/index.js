import { createStore } from "vuex";

export const store = createStore({
  state() {
    return {
      role: 'guest',
      user: null
    }
  }
});