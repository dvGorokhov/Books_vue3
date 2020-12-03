<template>
  <div class="container">
    <br />
    <h2>{{ book.name }}</h2>
    <br />
    <div class="row">
      <div class="col">
        <img :src="book.img" />
      </div>
      <div class="col info">
        <ul class="text-left">
          <li>Category: {{ book.category_name }}</li>
          <li v-if="book.year > 0">Year: {{ book.year }}</li>
          <li>Author: {{ book.author }}</li>
          <li>Info: {{ book.info }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    this.getInfo();
  },
  props: {
    book_id: {
      type: [Number, String],
    },
  },
  data() {
    return {
      book: {},
    };
  },
  methods: {
    getInfo() {
      axios
        .get("http://127.0.0.1:8000/api/auth/book/" + this.book_id)
        .then((response) => {
          this.book = response.data;
          console.log("book:", this.book);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  height: 350px;
  max-width: 500px;
}
span {
  display: block;
}
.info {
  display: flex;
  align-items: center;
}
</style>