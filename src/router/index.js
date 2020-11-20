import { createWebHistory, createRouter } from "vue-router";
import HelloWorld from "../components/HelloWorld";
import Auth from "../components/sing in/Auth";
import Register from "../components/sing in/Register";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HelloWorld,
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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;