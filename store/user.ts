/* eslint-disable no-console */
import { VuexModule, Module, Mutation } from 'vuex-module-decorators'
import { Tenant } from '~/types/types'

@Module({ name: 'user', stateFactory: true, namespaced: true })
export default class User extends VuexModule {
  tenant: Tenant | undefined
  authLoading: boolean = false
  authError: boolean = false
  errorMessage: string = ''

  @Mutation
  initTenant(tenant: Tenant) {
    this.tenant = tenant
  }

  public get loggedIn(): boolean {
    return this.tenant !== undefined
  }

  public get adminLoggedIn(): boolean {
    return this.tenant?.email === 'admin@dandora.com'
  }

  @Mutation
  setAuthLoading(isLoading: boolean) {
    this.authLoading = isLoading
  }

  @Mutation
  setAuthError(errorOccurred: boolean, message: string = '') {
    this.authError = errorOccurred
    this.errorMessage = message
  }

  @Mutation
  logOut() {
    this.tenant = undefined
  }
}
