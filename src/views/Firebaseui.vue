<template>
  <div class="loginui">
    <div id="firebaseui-auth-container"/>
  </div>
</template>

<script>
import { firebase } from "@/firestore";
import firebaseui from "firebaseui";
export default {
  created() {
    const store = this.$store;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        store.dispatch("login", { userAuth: user });
      } else {
        firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          .then(function() {
            let ui = firebaseui.auth.AuthUI.getInstance();
            if (!ui) {
              ui = new firebaseui.auth.AuthUI(firebase.auth());
            }
            const uiConfig = {
              callbacks: {
                signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                  return false;
                }
              },
              signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID
                // firebase.auth.EmailAuthProvider.PROVIDER_ID
                // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                // firebase.auth.GithubAuthProvider.PROVIDER_ID,
                // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                // firebase.auth.TwitterAuthProvider.PROVIDER_ID
              ]
              // signInFlow: 'popup'
            };
            ui.start("#firebaseui-auth-container", uiConfig);
          });
      }
    });
    // console.log(unsubscribe)
  }
};
</script>
<style src="firebaseui/dist/firebaseui.css">
</style>
<style scoped>
.loginui {
  text-align: center;
  overflow: hidden;
  width: 100%;
  /* background-color: pink; */
  /* height: 65px; */
}
</style>
