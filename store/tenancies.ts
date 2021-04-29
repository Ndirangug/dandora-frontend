/* eslint-disable no-console */
import { VuexModule, Module, Mutation } from 'vuex-module-decorators'
import { Tenant } from '~/types/types'

@Module({ name: 'tenants', stateFactory: true, namespaced: true })
export default class Tenants extends VuexModule {
  allTenants: Tenant[] = []

  @Mutation
  initTenants(tenants: Tenant[]) {
    this.allTenants = tenants
  }
}
