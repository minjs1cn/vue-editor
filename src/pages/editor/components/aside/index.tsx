import { computed, defineComponent } from 'vue'
import { useMyStore } from '../../../../store'

import styles from './index.module.less'

export default defineComponent({
  setup() {
    const store = useMyStore()

    const onClick = component => () => {
      store.dispatch('addComponent', {
        component
      })
    }

    return {
      components: computed(() => store.state.components),
      onClick
    }
  },
  render() {
    const { components, onClick } = this
    return (
      <div class={styles.aside}>
        {
          components.map(component => (
            <div class={styles.item} onClick={onClick(component)}>{component.name}</div>
          ))
        }
      </div>
    )
  }
})