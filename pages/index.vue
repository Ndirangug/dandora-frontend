<template>
  <div
    class="welcome-container d-flex flex-column justify-center align-center px-16"
  >
    <div
      class="intro d-flex flex-column justify-center align-center"
      :class="{ 'on-welcome-intro': welcome }"
    >
      <img
        class="logo"
        :class="{ 'on-welcome-logo': welcome }"
        src="/logo.png"
      />
      <h1
        class="title mx-16 text-center"
        :class="{ 'on-welcome-title': welcome }"
      >
        Dandora Resident Welfare Association Management System
      </h1>
      <v-btn
        v-show="!welcome"
        tile
        class="login-btn my-3 px-8"
        @click.prevent="onWelcome"
        >WELCOME
        <v-icon class="ml-3">{{ icons.arrowRight }}</v-icon>
      </v-btn>
    </div>

    <nuxt-child :class="{ 'on-welcome-child': welcome }" />
  </div>
</template>

<script lang="ts">
import { mdiArrowRight } from '@mdi/js'
import Vue from 'vue'
export default Vue.extend({
  // beforeRouteUpdate() {
  //   if (this.$route.path.endsWith('/auth')) {
  //     this.welcome = false
  //   }
  //   else{

  //   }
  // },
  data() {
    return {
      icons: {
        arrowRight: mdiArrowRight,
      },
      welcome: false,
    }
  },
  methods: {
    onWelcome() {
      this.welcome = true
      this.$router.push('/auth')
      console.log('on welcome')
    },
  },
})
</script>

<style lang="scss" scoped>
.welcome-container {
  height: 100%;
  background: #c2ccd6;
}

.logo {
  transition: width 2s, height 2s;
}

.title {
  transition: font-size 1s, width 1s;
}

.intro {
  transition: position 2s, top 2s;
}
.on-welcome-logo {
  width: 10em !important;
}

.on-welcome-title {
  font-size: 0.8em !important;
  max-width: 25em !important;
}

// .on-welcome-intro {
//   //position: relative;
//   // top: -3em;
// }

// .on-welcome-child {
//   // margin-top: -2em;
// }
</style>
