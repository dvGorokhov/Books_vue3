<template>
  <div class="row">
    <div class="col">
      <router-link to="/"
        ><button class="btn btn-primary">home</button></router-link
      >
    </div>
    <div class="col" v-if="isAdmin">
      <router-link to="/admin/category"
        ><button class="btn btn-primary">edit cat</button></router-link
      >
    </div>
    <div class="col" v-if="isAuth">
      <router-link to="/auth">sing in</router-link>
      <br />
      <router-link to="/reg">register</router-link>
    </div>
  </div>
</template>

<script>
import { store } from "../store";
export default {
  data() {
    return {
      users: [
        {
          id: 1,
          name: "serhio",
          pass: "******",
          role: "user",
        },
        {
          id: 2,
          name: "brat",
          pass: "******",
          role: "admin",
        },
      ],
    };
  },
  methods: {
    rewq() {
      console.log(store);
    },
  },
  computed: {
    isAuth() {
      return !store.state.role == "guest";
    },
    isAdmin() {
      return store.state.role == "admin";
    },
  },
};
</script>

<style lang="scss" scoped>
</style>