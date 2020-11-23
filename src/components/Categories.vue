<template>
  <div class="container">
    <br />
    <div class="row">
      <div
        class="col"
        v-for="cat in categories"
        v-bind:key="cat.id"
        @click="toBooks(cat.id)"
      >
        <img :src="cat.url" />
        <span>{{ cat.name }}</span>
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
      categories: [],
    };
  },
  methods: {
    getCategories() {
      axios
        .get("http://127.0.0.1:8000/api/auth/category")
        .then((response) => {
          console.log(response.data);
          this.categories = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    toBooks(id) {
      this.$router.push({ name: "books", params: { category_id: id } });
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