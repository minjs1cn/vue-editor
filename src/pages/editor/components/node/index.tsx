import { defineComponent, PropType, CSSProperties, computed, ref, onMounted, reactive } from 'vue'
import { Node, useMyStore } from '../../../../store'
import { isCurrentComponent } from './util'
import styles from './index.module.less'

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
        position: 'relative',
        ...props.node.style,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#eee',
        ...isCurrentComponent(store.state.currentNode, props.node) ? {
          borderColor: '#aaa',
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
        const { width, height }= (nodeRef.value.parentNode as HTMLElement).getBoundingClientRect()
        rect.width = width
        rect.height = height
      }
    })

    const directions = ['tl', 'tr', 'bl', 'br']

    const onResize = (e: MouseEvent) => {
      e.stopPropagation()
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
      let x = 0, y = 0, dx = 0, dy = 0, w = 0, h = 0
      const onMousemove = (e: MouseEvent) => {
        dx = e.clientX - start.x
        dy = e.clientY - start.y

        const { direction } = (e.target as HTMLElement).dataset
        switch (direction) {
          // 左上方
          case directions[0]:
            // xy正相关
            x = dx + node.x
            y = dy + node.y
            if (x < rect.x) {
              x = rect.x
            }
            if (y < rect.y) {
              y = rect.y
            }
            // wh反相关
            w = dx * -1 + node.width
            h = dy * -1 + node.height
            if (x + w > rect.width) {
              w = rect.width - x
            }
            if (y + h > rect.height) {
              h = rect.height - y
            }
            store.dispatch('setCurrentNodePosition', {
              x,
              y
            })
            store.dispatch('setCurrentNodeSize', {
              width: w,
              height: h
            })
            break
          // 右上方
          case directions[1]:
            // x不变，y正相关
            x = node.x
            y = dy + node.y
            if (y < rect.y) {
              y = rect.y
            }
            if (y > rect.height - node.height) {
              y = rect.height - node.height
            }
            store.dispatch('setCurrentNodePosition', {
              x,
              y
            })
            // w正相关，h反相关
            w = dx + node.width
            h = dy * -1 + node.height
            if (x + w > rect.width) {
              w = rect.width - x
            }
            store.dispatch('setCurrentNodeSize', {
              width: w,
              height: h
            })
            break
          // 左下方
          case directions[2]:
            // x正相关，y不变
            x = dx + node.x
            y = node.y
            if (x < rect.x) {
              x = rect.x
            }
            store.dispatch('setCurrentNodePosition', {
              x: dx + node.x,
              y: node.y
            })
            // w反相关，h正相关
            w = dx * -1 + node.width
            h = dy + node.height
            if (x + w > rect.width) {
              w = rect.width - x
            }
            if (node.y + h > rect.height) {
              h = rect.height
            }
            store.dispatch('setCurrentNodeSize', {
              width: w,
              height: h
            })
            break
            // 右下方
          case directions[3]:
            // xy不变
            x = node.x
            y = node.y
            // wh正相关
            w = dx + node.width
            h = dy + node.height
            if (x + w > rect.width) {
              w = rect.width - x
            }
            if (y + h > rect.height) {
              h = rect.height - y
            }
            store.dispatch('setCurrentNodeSize', {
              width: w,
              height: h
            })
            break
          default:
            break
        }
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

    const resizeBtns = computed(() => {
      return isCurrentComponent(store.state.currentNode, props.node) ? directions.map(item => (
        <div class={styles['resize'] + ' ' + styles[item]} onMousedown={onResize} data-direction={item}></div>
      )) : null
    })

    return () => (
      <div
        style={style.value}
        ref={e => nodeRef.value = e}
        onMousedown={onMousedown}
      >
        {slots.default()}
        {resizeBtns.value}
      </div>
    )
  }
})