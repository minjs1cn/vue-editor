import { reactive } from 'vue'

export function createStore<S>({ state }: { state: S & Object }) {
  return {
    state: reactive(state)
  }
}