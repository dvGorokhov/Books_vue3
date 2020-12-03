import { createWebHistory, createRouter } from "vue-router";
import Categories from "../components/Categories";
import Books from "../components/Books";
import BookInfo from "../components/BookInfo";
import NewBook from "../components/NewBook";
import EditBook from "../components/EditBook";
import Auth from "../components/sing in/Auth";
import Register from "../components/sing in/Register";
import AdminCategory from "../components/Admin/AdminCategory";
import store from "../store";

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
    props: true
  },
  {
    path: "/info/:book_id",
    name: "info",
    component: BookInfo,
    props: true
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
    meta: {
      requiresAuth: true
    },
    props: true
  },
  {
    path: "/new_book",
    name: "new_book",
    component: NewBook,
    props: true
  },
  {
    path: "/edit_book/:book_id",
    name: "edit_book",
    component: EditBook,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log('to', to);
  console.log('from', from);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn && store.getters.roleNow == 'admin') {
      next()
      return
    }
    next('/auth')
  }

  next()
  return
})

export default router;