import { defineComponent } from 'vue'
import styles from './index.module.less'

export default defineComponent({
  setup() {
    return () => <div style={styles.main}>a</div>
  }
})