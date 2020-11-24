<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <div>
        <input type="text" v-model="name" />
      </div>
      <div>
        <input type="text" v-model="info" />
      </div>
      <label
        >File
        <input
          type="file"
          id="file"
          ref="file"
          v-on:change="handleFileUpload()"
        />
      </label>
      <button v-on:click="submitFile()">Submit</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      file: "",
      info: "",
      name: "",
    };
  },
  methods: {
    handleFileUpload() {
      if (this.$refs.file.files[0].size > 100) {
        this.$refs.file.value = "";
        alert("rtfg");
      } else {
        this.file = this.$refs.file.files[0];
      }
    },
    submitFile() {
      let formData = new FormData();
      formData.append("img", this.file);
      formData.append("name", this.name);
      formData.append("info", this.info);
      axios
        .post("http://127.0.0.1:8000/api/auth/category", formData, {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function () {
          console.log("SUCCESS!!");
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>