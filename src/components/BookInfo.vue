<template>
  <div class="container">
    <br />
    <span>{{ book.name }}</span>
    <br />
    <div class="row">
      <div class="col">
        <img :src="book.img" />
      </div>
      <div class="col">
        <ul class="text-left">
          <li>Category: {{ book.category }}</li>
          <li>Year: {{ book.year }}</li>
          <li>Author: {{ book.author }}</li>
          <li>Info: {{ book.info }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getInfo();
  },
  data() {
    return {
      book: {
        id: 1,
        name: "people",
        author: "greg",
        year: 2020,
        info: "dasdas dasnd asd asj das dajs das d",
        img: "some url",
        category: "comedy",
      },
    };
  },
  methods: {
    getInfo() {},
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
</style>