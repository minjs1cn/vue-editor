import { defineComponent } from 'vue'
import styles from './index.module.less'

export default defineComponent({
  props: {
    active: Boolean,
    tab: {
      type: String
    }
  },

  setup(props, { slots }) {
    return () => <div class={styles.pane + ' ' + (props.active ? styles.active : '')}>{slots.default()}</div>
  }
})