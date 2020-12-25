import { defineComponent, h } from 'vue'
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
      <div>
        {page.title}
        <Renderder nodes={page.nodes} />
      </div>
    )
  }
})