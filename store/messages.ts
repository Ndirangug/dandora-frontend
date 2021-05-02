/* eslint-disable no-console */
import { VuexModule, Module, Mutation } from 'vuex-module-decorators'
import { Message } from '~/types/types'

@Module({ name: 'messages', stateFactory: true, namespaced: true })
export default class Messages extends VuexModule {
  allMessages: Message[] = []

  @Mutation
  initMessages(messages: Message[]) {
    this.allMessages = messages
  }

  @Mutation
  addMessage(message: Message) {
    this.allMessages.push(message)
  }
}
