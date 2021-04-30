<template>
  <v-app>
    <v-app-bar tile elevation="0" color="white" app>
      <v-app-bar-nav-icon class="ml-16" @click.stop="drawer = !drawer">
        <v-icon>{{ icons.menu }}</v-icon>
      </v-app-bar-nav-icon>
      <v-spacer />
      <v-app-bar-title>
        <img class="mt-3" width="120px" src="/logo.png" />
      </v-app-bar-title>
      <v-spacer />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="blue-grey-text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>

           <v-list-item>
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <nuxt />
  </v-app>
</template>

<script lang="ts">
import { mdiMenu } from '@mdi/js'
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      icons: {
        menu: mdiMenu,
      },
      drawer: false,
      group: null,
    }
  },

  watch: {
    group() {
      this.drawer = false
    },
  },
})
</script>
