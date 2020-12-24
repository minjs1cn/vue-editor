import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { RootState } from '../../../../store'

import styles from './index.module.less'

export default defineComponent({
  setup() {
    const store = useStore<RootState>()

    return {
      components: computed(() => store.state.components)
    }
  },
  render() {
    const { components } = this
    return (
      <div class={styles.aside}>
        {
          components.map(component => (
            <div class={styles.item}>{component.name}</div>
          ))
        }
      </div>
    )
  }
})