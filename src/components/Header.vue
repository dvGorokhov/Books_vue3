<template>
  <div class="row">
    <div class="col">
      <router-link to="/"
        ><button class="btn btn-primary">home</button></router-link
      >
    </div>
    <div class="col">
      <router-link v-if="isAdmin" to="/admin/category"
        ><button class="btn btn-primary mx-2">edit cat</button></router-link
      >
      <router-link v-if="isAuth" to="/new_book"
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
export default {
  data() {
    return {};
  },
  methods: {
    logout: function () {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/auth");
      });
    },
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
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