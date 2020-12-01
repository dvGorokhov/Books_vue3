<template>
  <div class="container">
    <div class="card border-primary">
      <div class="card-header bg-primary text-white">Register</div>
      <div class="card-body">
        <div>
          <input
            type="text"
            v-model="login"
            class="form-control"
            placeholder="введите email"
          />
          <br />
          <input
            type="text"
            v-model="name"
            class="form-control"
            placeholder="введите имя"
          />
          <br />
          <input
            type="password"
            v-model="pass"
            class="form-control"
            placeholder="введите пароль"
          />
          <br />
          <input
            type="password"
            v-model="pass2"
            class="form-control"
            placeholder="подтвердите пароль"
          />
          <span class="input-group-btn">
            <br />
            <button
              class="btn btn-primary"
              :disabled="!isDisabled"
              @click="register"
            >
              reg
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isDisabled() {
      return (
        this.name.length > 2 &&
        this.login.length > 2 &&
        this.pass.length > 5 &&
        this.pass2.length > 5 &&
        this.pass2 === this.pass
      );
    },
  },
  data() {
    return {
      name: "",
      login: "",
      pass: "",
      pass2: "",
    };
  },
  methods: {
    register() {
      let data = {
        name: this.name,
        email: this.login,
        password: this.pass,
        password2: this.pass2,
      };
      if (
        this.login.length > 2 &&
        this.name.length > 2 &&
        this.pass.length > 5 &&
        this.pass2.length > 5 &&
        this.pass === this.pass2
      ) {
        this.$store
          .dispatch("register", data)
          .then(() => this.$router.push("/"))
          .catch((err) => console.log(err));
      } else {
        alert("wrong data");
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>