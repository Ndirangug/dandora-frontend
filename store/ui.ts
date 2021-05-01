/* eslint-disable no-console */
import { VuexModule, Module } from 'vuex-module-decorators'

@Module({ name: 'ui', stateFactory: true, namespaced: true })
export default class UI extends VuexModule {}
