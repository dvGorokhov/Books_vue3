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
import axios from "axios";
import { store } from "../../store";
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
      let wm = this;
      if (
        this.login.length > 2 &&
        this.name.length > 2 &&
        this.pass.length > 5 &&
        this.pass2.length > 5 &&
        this.pass === this.pass2
      ) {
        axios
          .post("http://127.0.0.1:8000/api/auth/reg", {
            name: this.name,
            email: this.login,
            password: this.pass,
            password2: this.pass2,
          })
          .then(function (response) {
            localStorage.setItem(
              "token",
              JSON.stringify(response.data.access_token)
            );
            store.state.role = response.data.role;
            wm.$router.push({ name: "Home" });
          })
          .catch(function () {
            alert("wrong data");
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>