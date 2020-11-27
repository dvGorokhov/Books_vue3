import { createWebHistory, createRouter } from "vue-router";
import Categories from "../components/Categories";
import Books from "../components/Books";
import BookInfo from "../components/BookInfo";
import NewBook from "../components/NewBook";
import Auth from "../components/sing in/Auth";
import Register from "../components/sing in/Register";
import AdminCategory from "../components/Admin/AdminCategory";

import Test from "../components/Test";


const routes = [
  {
    path: "/test",
    name: "test",
    component: Test,
  },
  {
    path: "/",
    name: "Home",
    component: Categories,
  },
  {
    path: "/books/:category_id",
    name: "books",
    component: Books,
  },
  {
    path: "/info/:book_id",
    name: "info",
    component: BookInfo,
  },
  {
    path: "/auth",
    name: "auth",
    component: Auth
  },
  {
    path: "/reg",
    name: "register",
    component: Register
  },
  {
    path: "/admin/category",
    name: "adm_cat",
    component: AdminCategory,
    props: true
  },
  {
    path: "/new_book",
    name: "new_book",
    component: NewBook,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;