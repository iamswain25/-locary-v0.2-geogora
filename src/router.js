import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import Logout from "@/views/Logout.vue";
import District from "@/views/District.vue";
import Firebaseui from "@/views/Firebaseui";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/signin",
      component: Firebaseui
    },
    {
      path: "/district",
      component: District
    },
    {
      path: "/logout",
      component: Logout
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
