import Vue from "vue";
import Vuex from "vuex";
import { firestore } from "@/firestore";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userAuth: null,
    userInfo: null,
    coords: null
  },
  mutations: {
    userAuth: (state, payload) => (state.userAuth = payload),
    userInfo: (state, payload) => (state.userInfo = payload),
    coords: (state, payload) => (state.coords = payload)
  },
  actions: {
    login: ({ commit, state }, { userAuth }) => {
      commit("userAuth", userAuth);
      const { uid, displayName, photoURL, email } = userAuth;
      const userRef = firestore.collection("users").doc(uid);
      const loggedAt = new Date();
      userRef.collection("userLog").add({
        loggedAt
      });
      userRef.get().then(doc => {
        if (doc.exists) {
          commit("userInfo", doc.data());
        } else {
          const createdAt = new Date();
          commit("userInfo", { displayName, photoURL, createdAt, email });
          console.log(state.userInfo);
          userRef.set(state.userInfo);
        }
      });
    },
    logout: ({ commit }) => {
      commit("userAuth", null);
      commit("userInfo", null);
    },
    coords: ({ commit }, payload) => {
      commit("coords", payload);
    }
  }
});
