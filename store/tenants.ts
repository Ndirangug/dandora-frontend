/* eslint-disable no-console */
import { VuexModule, Module, Mutation } from 'vuex-module-decorators'
import { House } from '~/types/types'

@Module({ name: 'houses', stateFactory: true, namespaced: true })
export default class Houses extends VuexModule {
  allHouses: House[] = []

  @Mutation
  initHouses(houses: House[]) {
    this.allHouses = houses
  }
}
