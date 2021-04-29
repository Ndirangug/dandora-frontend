import { Context } from '@nuxt/types'
const host = 'https://127.0.0.1/:8000'

export const fetchHouses = (context: Context) => {
  context.$axios.get(`${host}/houses`)
}
