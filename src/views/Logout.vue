<script>
import { firebase } from "@/firestore";
export default {
  created() {
    firebase.auth().signOut();
    this.$store.dispatch('logout')
  }
};
</script>
