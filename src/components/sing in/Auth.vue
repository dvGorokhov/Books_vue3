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
import axios from "axios";
import { store } from "../../store";
export default {
  data() {
    return {
      login: "",
      pass: "",
    };
  },
  methods: {
    singIn() {
      let wm = this;
      if (this.login.length > 2) {
        if (this.pass.length > 5) {
          axios
            .post("http://127.0.0.1:8000/api/auth/login", {
              email: this.login,
              password: this.pass,
            })
            .then(function (response) {
              console.log(response.data);
              if (response.data.access_token) {
                localStorage.setItem(
                  "token",
                  JSON.stringify(response.data.access_token)
                );
                store.state.role = response.data.role;
                wm.$router.push({ name: "Home" });
              } else {
                alert("no such user");
              }
            })
            .catch(function () {
              alert("no such user");
            });
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