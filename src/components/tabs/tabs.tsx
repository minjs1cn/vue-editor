import { defineComponent, PropType, h, reactive, watchEffect } from 'vue'
import styles from './index.module.less'

export default defineComponent({
  props: {
    defaultActiveKey: {
      type: String,
      default: '1'
    },
    onChange: {
      type: Function as PropType<(activeKey: string) => void>
    }
  },

  emits: ['update:activeKey', 'change'],

  setup(props, { emit }) {
    const state = reactive({
      activeKey: props.defaultActiveKey
    })

    // todo: props change should rerender
    watchEffect(() => {})

    const onChange = key => () => {
      state.activeKey = key
      emit('update:activeKey', key)
      emit('change', key)
    }

    return {
      state,
      onChange
    }
  },

  render() {
    const { $slots, onChange, state } = this
    const { activeKey } = state
    // 所有 tab-pane 元素
    const children = $slots.default()
    // 所有 tab-bar
    const tabbars = children.map(child => ({
      key: child.key,
      tab: child.props.tab
    })).map(item => (
      <div onClick={onChange(item.key)} class={styles.bar + ' ' + (item.key === activeKey ? styles.active : '')}>{item.tab}</div>
    ))
    // 所有 tab-content
    const tabContents = children.map(child => (
      h(child, {
        active: child.props.key === activeKey
      })
    ))

    return <div class={styles.tabs}>
      <div class={styles.bars}>
        {tabbars}
      </div>
      <div class={styles.panes}>
        {tabContents}
      </div>
    </div>
  }
})