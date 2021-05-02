<template>
  <div
    class="messages-container d-flex flex-column justify-center align-center pt-16 px-6 px-sm-16 px-md-8"
  >
    <h3 class="text-h6 mb-4">MESSAGES</h3>
    <textarea
      v-model="form.text"
      class="textfield mb-4"
      clearable
      :counter="5000"
      shaped
      filled
      autocomplete
      auto-grow
      placeholder="Type a new message"
      rows="4"
      :clear-icon="icons.clear"
    />
    <v-btn :loading="loading" color="primary mb-16" @click="sendMessage"
      >BROADCAST MESSAGE</v-btn
    >

    <div class="messages-list">
      <p>Past Messages</p>
      <message-card
        v-for="message in messages"
        :key="message.id"
        :message="message"
        class="my-4"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { mdiCloseCircle } from '@mdi/js'
import Vue from 'vue'
import MessageCard from './MessageCard.vue'
import { messagesStore } from '~/store'
import { Message } from '~/types/types'
export default Vue.extend({
  components: { MessageCard },
  data() {
    return {
      icons: {
        clear: mdiCloseCircle,
      },
      form: {
        text: '',
      },
      loading: false,
    }
  },
  computed: {
    messages(): Message[] {
      return messagesStore.allMessages
        .slice()
        .sort(
          (a, b) =>
            Date.parse(`${b.created_at}`) - Date.parse(`${a.created_at}`)
        )
    },
  },
  methods: {
    async sendMessage() {
      this.loading = true
      try {
        const response = await this.$axios.post(
          `${this.$config.apiUrl}/messages`,
          {
            text: this.form.text,
          }
        )

        if (
          response.status.toString() === '200' ||
          response.status.toString() === '201'
        ) {
          console.log(response.data)
          messagesStore.addMessage(response.data)
        } else {
          throw new Error(
            `Couldnt send message. Error ${response.status} ${response.statusText}`
          )
        }
      } catch (error) {
        console.error(error)
      }

      this.loading = false
    },
  },
})
</script>

<style lang="scss">
.textfield {
  width: 100%;
}
</style>
