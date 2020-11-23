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
        <tr>
          <td>id</td>
          <td>name</td>
          <td>img</td>
          <td>info</td>
          <td><button class="btn btn-warning">1</button></td>
          <td><button class="btn btn-danger">2</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { store } from "../../store";
export default {};
</script>

<style lang="scss" scoped>
.btn-success {
  display: block;
}
</style>