import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    key: {
      type: String
    }
  },

  render() {
    return <div>tabs-pane</div>
  }
})