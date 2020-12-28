import { defineComponent } from 'vue'
import { useMyStore } from '../../../../store'
import Renderder from '../renderer'

export default defineComponent({
  setup() {
    const store = useMyStore()

    return {
      page: store.state.work.page
    }
  },
  render() {
    const { page } = this
    return (
      <div class="flex column">
        <div>{page.title}</div>
        <div class="flex" style={{
          width: '375px',
          margin: '0 auto',
          height: '667px',
          border: '1px solid #eee'
        }}>
          <Renderder nodes={page.nodes} />
        </div>
      </div>
    )
  }
})