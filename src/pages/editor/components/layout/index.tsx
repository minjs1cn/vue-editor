import { defineComponent } from 'vue'
import './index.less'

export default defineComponent({
  setup() {
    return {
    }
  },

  render() {
    const { $slots } = this

    return (
      <div class="flex column editor">
        <div class="flex editor-header">{$slots.header()}</div>
        <div class="flex row editor-main">
          <div class="editor-aside">{$slots.aside()}</div>
          <div class="flex editor-content">{$slots.content()}</div>
          <div class="editor-panel">{$slots.panel()}</div>
        </div>
      </div>
    )
  }
})