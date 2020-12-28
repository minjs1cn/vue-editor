import { defineComponent, PropType, CSSProperties, computed, ref, onMounted, reactive } from 'vue'
import { Node, useMyStore } from '../../../../store'
import { isCurrentComponent } from './util'

export default defineComponent({
  props: {
    node: {
      type: Object as PropType<Node>
    }
  },

  setup(props, { slots }) {
    const store = useMyStore()
    const nodeRef = ref(null)
    const rect = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    }

    const style = computed<CSSProperties>(() => (
      {
        ...props.node.style,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'transparent',
        ...isCurrentComponent(store.state.currentNode, props.node) ? {
          borderColor: '#eee',
          cursor: 'pointer'
        } : {}
      }
    ))
    
    const onMousedown = (e: MouseEvent) => {
      e.stopPropagation()
      // 选中当前操作组件
      const nodes = store.state.work.page.nodes.filter(node => node._uid === props.node._uid)
      if (nodes.length) {
        store.dispatch('setCurrentNode', {
          node: nodes[0]
        })
      }
      // 记住开始坐标
      const start = {
        x: e.clientX,
        y: e.clientY
      }
      // 节点开始位置
      const { left, top, width, height  } = props.node.style
      const node = {
        x: parseFloat(left as string),
        y: parseFloat(top as string),
        width: parseFloat(width as string),
        height: parseFloat(height as string),
      }
      let x = 0, y = 0
      const onMousemove = (e: MouseEvent) => {
        x = e.clientX - start.x + node.x
        y = e.clientY - start.y + node.y

        if (x < rect.x) x = 0
        if (x > rect.width - node.width) x = rect.width - node.width
        if (y < rect.y) y = 0
        if (y > rect.height - node.height) y = rect.height - node.height

        store.dispatch('setCurrentNodePosition', {
          x,
          y
        })
      }

      const onMouseup = (e: MouseEvent) => {
        document.removeEventListener('mousemove', onMousemove)
        document.removeEventListener('mouseup', onMouseup)
      }

      // 添加鼠标移动事件
      document.addEventListener('mousemove', onMousemove)
      // 添加鼠标松开事件
      document.addEventListener('mouseup', onMouseup)
    }

    onMounted(() => {
      if (nodeRef.value && nodeRef.value.parentNode) {
        const { width, height }= (nodeRef.value.parentNode as HTMLDivElement).getBoundingClientRect()
        rect.width = width
        rect.height = height
      }
    })

    return () => (
      <div
        style={style.value}
        ref={e => nodeRef.value = e}
        onMousedown={onMousedown}
      >
        {slots.default()}
      </div>
    )
  }
})