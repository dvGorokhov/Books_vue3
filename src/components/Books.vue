<template>
  <div class="container">
    <p>{{ info }}</p>
    <div class="row">
      <div class="col" v-for="book in books" v-bind:key="book.id">
        <img @click="toBookInfo(book.id)" :src="book.img" />
        <span>{{ book.name }}</span>
        <span v-if="book.year">({{ book.year }})</span>
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
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    category_id: {
      type: [Number, String],
    },
  },
  mounted() {
    this.getCategory();
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
    };
  },
  methods: {
    getCategory() {
      axios
        .get("http://127.0.0.1:8000/api/auth/category/" + this.category_id)
        .then((response) => {
          console.log("resp", response);
          this.books = response.data.books;
          this.info = response.data.info;
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
  max-width: 200px;
}
span {
  display: block;
}
</style>