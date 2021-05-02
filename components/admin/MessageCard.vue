<template>
  <div class="message-card">
    <v-card class="mx-auto" max-width="400">
      <v-card-subtitle class="font-italic font-weight-medium">
        {{
          new Intl.DateTimeFormat('en', {
            timeStyle: 'medium',
            dateStyle: 'short',
          }).format(Date.parse(`${message.created_at}`))
        }}</v-card-subtitle
      >

      <v-card-actions class="mt-n4 pl-4">
        <div class="text-body-2">{{ textTip }}...</div>

        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? icons.up : icons.down }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show" class="mt-n3">
          <v-card-text>
            {{ restOfText }}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script lang="ts">
import { mdiChevronDown, mdiChevronUp } from '@mdi/js'
import Vue, { PropOptions } from 'vue'
import { Message } from '~/types/types'
export default Vue.extend({
  props: {
    message: {
      type: Object,
      required: true,
      default: null,
    } as PropOptions<Message>,
  },
  data() {
    return {
      icons: {
        up: mdiChevronUp,
        down: mdiChevronDown,
      },
      show: false,
      textTip: this.message.text.substring(0, 70),
      restOfText: this.message.text.substring(71),
    }
  },
})
</script>
