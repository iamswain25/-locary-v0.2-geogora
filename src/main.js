import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "./registerServiceWorker";
import * as VueGoogleMaps from "vue2-google-maps";
import router from "./router";
import store from "./store";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAtMTOSvTiNH3HGT7VSaaIRBY1e3Re7D3g",
    libraries: "places" // necessary for places input
  }
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
