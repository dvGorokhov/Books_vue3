<template>
  <div>
    <button class="btn btn-success my-2">add category</button>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">name</th>
          <th scope="col">cat_img_url</th>
          <th scope="col">info</th>
          <th scope="col">change</th>
          <th scope="col">del</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cat, index) in categories" v-bind:key="cat.id">
          <td>{{ cat.id }}</td>
          <td>{{ cat.name }}</td>
          <td>{{ cat.url }}</td>
          <td>{{ cat.info }}</td>
          <td><button class="btn btn-warning">1</button></td>
          <td>
            <button class="btn btn-danger" @click="delete_cat(index)">2</button>
          </td>
        </tr>
      </tbody>
    </table>
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
        .get("http://127.0.0.1:8000/api/auth/category", {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.categories = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    delete_cat(index) {
      axios
        .delete(
          "http://127.0.0.1:8000/api/auth/category" +
            "/" +
            this.categories[index].id,
          {
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
          }
        )
        .then(() => {
          this.getCategories();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-success {
  display: block;
}
</style>