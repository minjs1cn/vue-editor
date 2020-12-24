import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    activeKey: {
      type: String,
      default: '1'
    },
    defaultActiveKey: {
      type: String,
      default: '1'
    },
    onChange: {
      type: Function as PropType<(activeKey: string) => void>
    }
  },

  render() {
    const children = this.$slots.default()
    console.log(children)
    return <div>tabs</div>
  }
})