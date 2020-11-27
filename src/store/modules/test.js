import axios from "axios";

export default {

  state: {
    posts: [1, 2]
  },
  actions: {
    getPosts({ commit }) {
      axios
        .get("http://127.0.0.1:8000/api/auth/category")
        .then((response) => {
          console.log(response.data);
          commit('All_POSTS', response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
  mutations: {
    All_POSTS(state, posts) {
      state.posts = posts
    }
  },
  getters: {
    myPosts: state => state.posts
  }
}