<template>
  <div class="container">
    <div class="d-flex">
      <button
        @click="getCategory(current_page, 'asc')"
        class="btn sort btn-outline-secondary"
      >
        asc
      </button>
      <button
        @click="getCategory(current_page, 'desc')"
        class="btn sort btn-outline-secondary"
      >
        desc
      </button>
      <input
        v-model="search"
        class="search"
        type="text"
        placeholder="введите название книги"
      />
      <button @click="getCategory(1)" class="btn btn-sm btn-outline-secondary">
        search
      </button>
    </div>
    <hr />
    <h3 class="my-4">{{ info }}</h3>
    <div class="row">
      <div class="col" v-for="book in books" v-bind:key="book.id">
        <img @click="toBookInfo(book.id)" :src="book.img" />
        <span>{{ book.name }}</span>
        <span class="mb-2" v-if="book.year">({{ book.year }})</span>
        <button
          v-if="
            user_id === book.user_id || this.$store.getters.roleNow == 'admin'
          "
          class="btn-sm btn btn-warning"
          @click="editBook(book.id)"
        >
          edit
        </button>
      </div>
      <Paginate
        :books_in_page="books_in_page"
        :total_books="total_books"
        @page-changed="getCategory"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Paginate from "./Paginate.vue";
export default {
  components: { Paginate },
  props: {
    category_id: {
      type: [Number, String],
    },
  },
  mounted() {
    this.getCategory(this.current_page);
  },
  computed: {
    user_id() {
      let user = this.$store.getters.userNow;
      if (user && Object.keys(user).length != 0) {
        return user.id;
      }

      return 0;
    },
  },
  data() {
    return {
      info: "",
      books: [],
      current_page: 1,
      total_books: 0,
      books_in_page: 3,
      sort: "asc",
      search: "",
    };
  },
  methods: {
    getCategory(pageNum, sort = this.sort) {
      this.sort = sort;
      console.log("page", pageNum);
      axios
        .get(
          "http://127.0.0.1:8000/api/auth/category/" +
            this.category_id +
            "?page=" +
            pageNum +
            "&sort=" +
            sort +
            "&search=" +
            this.search
        )
        .then((response) => {
          console.log("resp", response.data);
          this.books = response.data.books.data;
          this.info = response.data.info;
          this.current_page = response.data.books.current_page;
          this.total_books = response.data.books.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    toBookInfo(id) {
      this.$router.push({ name: "info", params: { book_id: id } });
    },
    editBook(id) {
      this.$router.push({ name: "edit_book", params: { book_id: id } });
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  height: 150px;
  width: 200px;
}
span {
  display: block;
}
.sort {
  display: block;
  margin: 0 5px;
}
.search {
  margin-left: auto;
}
</style>