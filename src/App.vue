<template>
  <v-app>
    <v-navigation-drawer app v-model="left" clipped>
      <v-list dense class="grey lighten-4">
        <v-list-tile class="mt-2">
          <v-list-tile-action>
            <v-icon>person_pin</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="grey--text">Sign In</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <template v-for="(item, i) in items">
          <v-divider v-if="item.divider" :key="i" dark class="my-2"></v-divider>
          <v-list-tile v-else :key="i" :to="item.url">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="grey--text">{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app clipped-left>
      <v-toolbar-side-icon @click.stop="left = !left"></v-toolbar-side-icon>
      <v-toolbar-title>Locary</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-navigation-drawer app right clipped v-model="right"></v-navigation-drawer>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    HelloWorld
  },
  data() {
    return {
      left: false,
      right: false,
      items: [
        { divider: true },
        { icon: "account_balance", text: "District", url:"district" },
        { divider: true },
        { icon: "mode_comment", text: "My Posts", url:"posts" },
        { icon: "archive", text: "Archive", url:"archive" },
        { divider: true },
        { icon: "settings", text: "Settings", url:"settings" },
        { icon: "help", text: "Help", url:"help" },
        { icon: "person_outline", text: "Logout", url:"logout" }
      ]
    };
  }
};
</script>
