<template>
  <div class="container">
    <div class="paginate">
      <button
        v-for="page in totalPages"
        :key="page"
        class="btn btn-sm btn-danger"
        @click="ChangePage(page)"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["books_in_page", "total_books"],
  data() {
    return {
      current_page: 1,
    };
  },
  computed: {
    totalPages() {
      console.log("math", Math.ceil(this.total_books / this.books_in_page));
      return Math.ceil(this.total_books / this.books_in_page);
    },
  },
  methods: {
    ChangePage(pageNum) {
      this.current_page = pageNum;
      this.$emit("page-changed", pageNum);
    },
  },
};
</script>

<style lang="scss" scoped>
.paginate {
  display: flex;
  justify-content: center;
}
.paginate button {
  margin: 0 5px;
}
</style>