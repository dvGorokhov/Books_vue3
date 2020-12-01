<template>
  <div>
    <h3>test categories</h3>
    <br />
    <div v-for="post in myPosts" v-bind:key="post.id">
      {{ post.name }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: mapGetters(["myPosts"]),
  mounted() {
    //this.$store.dispatch("getPosts");
    this.getPosts();
  },
  methods: {
    ...mapActions(["getPosts"]),
  },
};
</script>

<style lang="scss" scoped>
</style>