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
      let login = this.login;
      let pass = this.pass;
      if (login.length < 2) {
        alert("Wrong login");
        return;
      }
      if (pass.length < 5) {
        alert("Wrong password");
        return;
      }
      this.$store
        .dispatch("getUserRole", { email: login, password: pass })
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
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