import { defineComponent, onMounted, reactive } from 'vue'
import { useMyStore } from '../../../../store'
import Renderder from '../renderer'
import Ruler from '../ruler'

export default defineComponent({
  setup() {
    const store = useMyStore()

    const { page } = store.state.work
    const rule = reactive({
      width: 0,
      height: 0
    })

    onMounted(() => {
      const content = document.querySelector('#content')
      const { width, height } = content.getBoundingClientRect()
      rule.width = width
      rule.height = height
    })

    return () => (
      <div id="content" class="flex column" style={{
        position: 'relative',
        paddingTop: '20px'
      }}>
        <div style={{ position: 'absolute', left: '0px', top: '0px', bottom: '0px', right: '0px' }}>
          <Ruler width={rule.width} height={rule.height} />
        </div>
        <div style={{
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