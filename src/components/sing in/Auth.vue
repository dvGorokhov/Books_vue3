<template>
  <div class="container">
    <div class="card">
      <div class="card-header">Autorization</div>
      <div class="card-body">
        <div class="mb-2">
          <input type="text" placeholder="login" v-model="login" />
        </div>
        <div>
          <input type="password" placeholder="password" v-model="pass" />
        </div>
      </div>
    </div>
    <button class="btn btn-warning" @click="singIn">entry</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: "",
      pass: "",
    };
  },
  methods: {
    singIn() {
      if (this.login === "admin") {
        if (this.pass === "admin") {
          // localStorage.setItem(
          //   "token",
          //   JSON.stringify(response.data.access_token)
          // );
          // this.$router.push({ name: "adm_cat" });
          console.log(true);
        } else {
          alert("Wrong password");
        }
      } else {
        alert("Wrong login");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  width: inherit;
  max-width: 200px;
}
</style>