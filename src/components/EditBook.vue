<template>
  <div class="container">
    <div class="card border-warning">
      <div class="card-header bg-warning text-black">
        <h3>New Book</h3>
      </div>
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
            <button class="btn btn-primary" @click="submitFile()">Send</button>
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
    this.getBook();
  },
  props: {
    book_id: {
      type: [Number, String],
    },
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
      book: {},
    };
  },
  methods: {
    getBook() {
      let wm = this;
      axios
        .get("http://127.0.0.1:8000/api/auth/book/" + this.book_id)
        .then((response) => {
          this.book = response.data;
          if (
            this.$store.getters.userNow.id != this.book.user_id ||
            this.$store.getters.roleNow != "admin"
          ) {
            wm.$router.push({ name: "Home" });
          }
          this.info = this.book.info;
          this.name = this.book.name;
          this.author = this.book.author;
          this.year = this.book.year;
          this.category = this.book.category_id;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
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
      let wm = this;
      let formData = new FormData();
      formData.append("img", this.file);
      formData.append("id", this.book.id);
      formData.append("name", this.name);
      formData.append("info", this.info);
      formData.append("author", this.author);
      formData.append("year", this.year);
      formData.append("category_id", this.category);
      axios
        .post("http://127.0.0.1:8000/api/auth/book", formData)
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
};
</script>
<style lang="scss" scoped>
</style>