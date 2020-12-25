import { defineComponent, PropType, CSSProperties, computed, ref } from 'vue'
import { useMyStore } from '../../../../store'

export default defineComponent({
  props: {
    style: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    uid: Number
  },

  setup(props, { slots }) {
    const store = useMyStore()
    const nodeRef = ref(null)

    const style = computed<CSSProperties>(() => (
      {
        ...props.style,
        ...(store.state.currentComponent && store.state.currentComponent._uid === props.uid) ? {
          border: '1px solid #eee'
        } : {}
      }
    ))
    
    // 选中该节点
    const onClick = () => {
      const nodes = store.state.work.page.nodes.filter(node => node._uid === props.uid)
      console.log(nodes)
      if (nodes.length) {
        store.dispatch('setCurrent', {
          component: nodes[0]
        })
      }
    }

    let startPos = null

    const onMousemove = (e: MouseEvent) => {
      store.dispatch('setPosition', {
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y
      })
    }

    const onMousedown = (e: MouseEvent) => {
      console.log('down')
      onClick()
      startPos = {
        x: e.clientX,
        y: e.clientY
      }
      nodeRef.value.addEventListener('mousemove', onMousemove)
      nodeRef.value.addEventListener('mouseup', onMouseup)
    }

    const onMouseup = () => {
      console.log('up')
      nodeRef.value.removeEventListener('mousemove', onMousemove)
      nodeRef.value.removeEventListener('mouseup', onMouseup)
    }

    return () => (
      <div
        style={style.value}
        onClick={onClick}
        onMousedown={onMousedown}
        ref={e => nodeRef.value = e}
      >
        {slots.default()}
      </div>
    )
  }
})