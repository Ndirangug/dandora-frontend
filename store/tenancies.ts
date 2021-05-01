/* eslint-disable no-console */
import { VuexModule, Module, Mutation } from 'vuex-module-decorators'
import { Tenancy } from '~/types/types'

@Module({ name: 'tenancies', stateFactory: true, namespaced: true })
export default class Tenancies extends VuexModule {
  allTenancies: Tenancy[] = []

  @Mutation
  initTenancies(tenancies: Tenancy[]) {
    this.allTenancies = tenancies
  }
}
