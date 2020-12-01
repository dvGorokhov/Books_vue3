<template>
  <div class="container">
    <div class="card border-primary">
      <div class="card-header bg-primary text-white">New Book</div>
      <div class="card-body">
        <div class="">
          <div class="col">
            <span>Выберите категорию:</span>
            <br />
            <select v-model="category">
              <option
                :value="cat.id"
                v-for="cat in categories"
                v-bind:key="cat.id"
              >
                {{ cat.name }}
              </option>
            </select>
          </div>
          <div class="col">
            <input
              type="text"
              placeholder="введите название"
              class="my-2"
              v-model="name"
            />
          </div>
          <div class="col">
            <input
              type="text"
              placeholder="введите имя автора"
              class="my-2"
              v-model="author"
            />
          </div>
          <div class="col">
            <input
              type="text"
              maxlength="4"
              placeholder="введите год выпуска"
              class="my-2"
              @input="inputYear"
              v-model="year"
            />
          </div>
          <div class="col">
            <textarea
              placeholder="введите описание"
              class="my-2"
              v-model="info"
            ></textarea>
          </div>
          <label
            >File
            <input
              type="file"
              id="file"
              ref="file"
              accept="image/jpeg,image/png,image/jpg"
              v-on:change="handleFileUpload()"
            />
          </label>
        </div>
        <div>
          <span class="input-group-btn">
            <br />
            <button
              class="btn btn-primary"
              @click="submitFile()"
              :disabled="isDisabled"
            >
              Send
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  mounted() {
    this.getCategories();
  },
  data() {
    return {
      file: "",
      info: "",
      name: "",
      author: "",
      year: "",
      category: "",
      categories: [],
    };
  },
  methods: {
    getCategories() {
      axios
        .get("http://127.0.0.1:8000/api/auth/category", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.categories = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleFileUpload() {
      if (this.$refs.file.files[0].size > 500 * 1000) {
        this.$refs.file.value = "";
        alert("max size file 500kb");
      } else {
        this.file = this.$refs.file.files[0];
      }
    },
    submitFile() {
      if (this.category == "") {
        alert("выберите категорию");
        return;
      }
      if (this.name && this.name.length < 2) {
        alert("введите название книги");
        return;
      }
      if (this.author && this.author.length < 2) {
        alert("введите имя автора");
        return;
      }
      if (this.info && this.info.length > 2000) {
        alert("введите информацию о книге");
        return;
      }
      if (
        (this.year.length !== 4 || this.year.length !== 0) &&
        this.year > new Date().getFullYear() + 1
      ) {
        alert("введите год издания или оставьте поле пустым ");
        return;
      }
      if (this.file == "") {
        alert("вставьте изображение");
        return;
      }
      let wm = this;
      let formData = new FormData();
      formData.append("img", this.file);
      formData.append("name", this.name);
      formData.append("info", this.info);
      formData.append("author", this.author);
      formData.append("year", this.year);
      formData.append("category_id", this.category);
      axios
        .post("http://127.0.0.1:8000/api/auth/book", formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function () {
          console.log("SUCCESS!!");
          wm.$router.push({ name: "Home" });
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    },
    inputYear() {
      this.year = this.year.replace(/[^+\d]/g, "");
    },
  },
  computed: {
    isDisabled() {
      return (
        this.category == "" ||
        this.author.length < 2 ||
        (this.year.length < 4 && this.year.length > 0) ||
        this.year > new Date().getFullYear() + 1 ||
        this.info.length > 2000 ||
        this.info.length == 0 ||
        this.name < 2 ||
        this.file == ""
      );
    },
  },
};
</script>
<style lang="scss" scoped>
</style>