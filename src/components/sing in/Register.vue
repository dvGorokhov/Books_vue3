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
    <ul v-if="err.length > 0">
      <li v-for="(error, index) in err" v-bind:key="index">>{{ error }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    isDisabled() {
      return (
        this.login.length > 2 &&
        this.pass.length > 5 &&
        this.pass2.length > 5 &&
        this.pass2 === this.pass
      );
    },
  },
  data() {
    return {
      err: [],
      login: "",
      pass: "",
      pass2: "",
    };
  },
  methods: {
    register() {
      console.log(true);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>