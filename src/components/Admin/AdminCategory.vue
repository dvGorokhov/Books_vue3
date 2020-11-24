<template>
  <div>
    <button class="btn btn-success my-2" @click="showModal">
      add category
    </button>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">name</th>
          <th scope="col">cat_img</th>
          <th scope="col">info</th>
          <th scope="col">change</th>
          <th scope="col">del</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cat, index) in categories" v-bind:key="cat.id">
          <td>{{ cat.id }}</td>
          <td>{{ cat.name }}</td>
          <td>
            <img :src="cat.url" />
          </td>
          <td>{{ cat.info }}</td>
          <td>
            <button class="btn btn-warning" @click="showModal(index)">1</button>
          </td>
          <td>
            <button class="btn btn-danger" @click="delete_cat(index)">2</button>
          </td>
        </tr>
      </tbody>
    </table>
    <CategoryModal :show="show_modal" @hide="closeModal">
      <template v-slot:content>
        <span>new name</span>
        <input v-model="selected.name" type="text" />
        <span>new url</span>
        <input
          type="file"
          id="file"
          ref="file"
          v-on:change="handleFileUpload()"
        />
        <span>new info</span>
        <input v-model="selected.info" type="text" />
        <div>
          <button @click="addCategory">add</button>
        </div>
      </template>
    </CategoryModal>
  </div>
</template>

<script>
import axios from "axios";
import CategoryModal from "../modal/CategoryModal";
export default {
  mounted() {
    this.getCategories();
  },
  components: {
    CategoryModal,
  },
  data() {
    return {
      categories: [],
      show_modal: false,
      file: "",
      selected: {
        index: null,
        id: null,
        name: "",
        img: "",
        info: "",
      },
    };
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    getCategories() {
      axios
        .get("http://127.0.0.1:8000/api/auth/category", {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        })
        .then((response) => {
          this.closeModal();
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
    addCategory() {
      let formData = new FormData();
      formData.append("img", this.file);
      formData.append("name", this.selected.name);
      formData.append("id", this.selected.id);
      formData.append("info", this.selected.info);

      axios
        .post("http://127.0.0.1:8000/api/auth/category", formData, {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          this.getCategories();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    showModal(index = null) {
      if (index > -1) {
        this.selected = {
          index: index,
          id: this.categories[index].id,
          name: this.categories[index].name,
          info: this.categories[index].info,
          img: "",
        };
      }
      this.show_modal = true;
    },
    closeModal() {
      this.show_modal = false;
      this.selected = {
        index: null,
        id: null,
        name: "",
        img: "",
        info: "",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-success {
  display: block;
}
img {
  height: 90px;
  width: 100px;
}
</style>