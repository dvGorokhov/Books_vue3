<template>
  <div class="row">
    <div class="col">
      <router-link to="/"
        ><button class="btn btn-primary">home</button></router-link
      >
    </div>
    <div class="col" v-if="isAdmin">
      <router-link to="/admin/category"
        ><button class="btn btn-primary mx-2">edit cat</button></router-link
      >
      <router-link to="/new_book"
        ><button class="btn btn-primary">new book</button></router-link
      >
    </div>
    <div class="col" v-if="!isAuth">
      <router-link to="/auth">sing in</router-link>
      <br />
      <router-link to="/reg">register</router-link>
    </div>
    <div class="col" v-else>
      <router-link to="/"
        ><button class="btn btn-primary" @click="logout">
          logout
        </button></router-link
      >
    </div>
  </div>
</template>

<script>
import store from "../store";
import axios from "axios";
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      let wm = this;
      axios
        .post("http://127.0.0.1:8000/api/auth/logout", {})
        .then(function () {
          localStorage.removeItem("token");
          store.state.role = "guest";
          store.state.user = null;
          wm.$router.push({ name: "auth" });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
  computed: {
    isAuth() {
      return this.$store.getters.roleNow !== "guest";
    },
    isAdmin() {
      return this.$store.getters.roleNow == "admin";
    },
  },
};
</script>

<style lang="scss" scoped>
</style>