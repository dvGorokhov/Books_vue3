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
        <img :src="cat.img" />
        <span>{{ cat.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getCategories();
  },
  data() {
    return {
      categories: [
        {
          id: 1,
          name: "qwert",
          img: "12344",
        },
        {
          id: 2,
          name: "qwwwrt",
          img: "12344",
        },
      ],
    };
  },
  methods: {
    getCategories() {},
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