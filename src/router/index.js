import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue"
import HomeView from "../views/HomeView.vue"
import PostView from "../views/PostView.vue"
import NewsView from "../views/NewsView.vue"
import ManageView from "../views/ManageView.vue"
import HotNewsView from "../views/HotNews.vue"
import ClassifyView from "../views/ClassifyView.vue"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/post",
      name: "post",
      component: PostView,
    },
    {
      path: "/news/:title/:content/:name/:updateTime",
      name: "news",
      component: NewsView,
      props:true
    },
    {
      path: "/manage",
      name: "manage",
      component: ManageView,
    },
    {
      path: "/hotNews",
      name: "hotNews",
      component: HotNewsView,
    },
    {
      path: "/classify",
      name: "classify",
      component: ClassifyView ,
    },
  ],
});

export default router;
