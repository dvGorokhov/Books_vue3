<template>
  <div class="container">
    <p>{{ categoryInfo }}</p>
    <div class="row">
      <div
        class="col"
        v-for="book in books"
        v-bind:key="book.id"
        @click="toBookInfo(book.id)"
      >
        <img :src="book.img" />
        <span>{{ book.name }} ({{ book.year }})</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getBooks();
  },
  data() {
    return {
      categoryInfo: "some text",
      books: [
        {
          id: 1,
          name: "qwert",
          year: 2020,
          img: "12344",
        },
      ],
    };
  },
  methods: {
    getBooks() {},
    toBookInfo(id) {
      this.$router.push({ name: "info", params: { book_id: id } });
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