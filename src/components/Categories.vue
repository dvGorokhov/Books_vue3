<template>
  <div class="container">
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
  data() {
    return {
      categories: [
        {
          id: 1,
          name: "qwert",
          img: "12344",
        },
      ],
    };
  },
  methods: {
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