import { computed, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
    }
  },
  render() {
    const { components, addComponent } = this
    return (
      <div onClick={addComponent}>addComponent</div>
    )
  }
})