import { CSSProperties } from 'vue'
import { createStore, useStore } from 'vuex'

interface Component {
  id: number
  name: string
  component: string
  props?: {
    [key: string]: unknown
  }
}

interface Work {
  id?: number
  title: string
  page: Page
}

interface Page {
  title: string
  nodes: Array<Node>
}

export interface Node extends Component {
  style: CSSProperties
  _uid: number
}

export interface RootState {
  components: Array<Component>
  work: Work,
  works: Array<Work>,
  currentNode: Node | null
}
let _uid = 0

const store = createStore<RootState>({
  state: {
    components: [
      {
        id: 1,
        name: '大转盘',
        component: 'wheel'
      },
      {
        id: 2,
        name: '刮刮卡',
        component: 'scratchCard'
      },
      {
        id: 3,
        name: '翻牌子',
        component: 'turnCard'
      }
    ],
    work: {
      title: 'New Work',
      page: {
        title: 'New Page',
        nodes: []
      }
    },
    works: [],
    currentNode: null,
  },
  actions: {
    // 添加组件
    addComponent({ state, dispatch }, { component }: { component: Component }) {
      const newNode: Node = {
        ...component,
        style: {
          position: 'absolute',
          left: '0px',
          top: '0px',
          width: '200px',
          height: '200px',
          zIndex: 0
        },
        _uid: ++_uid
      }
      state.work.page.nodes.push(newNode)
      // 立即设置当前节点为新添加的组件
      dispatch('setCurrentNode', {
        node: newNode
      })
    },
    // 设置当前节点
    setCurrentNode({ state }, { node }: { node: Node }) {
      state.currentNode = node
    },
    // 更新当前节点的位置
    setCurrentNodePosition({ state }, { x, y }: { x: number, y: number }) {
      state.currentNode.style.left = x + 'px'
      state.currentNode.style.top = y + 'px'
    }
  }
})

function useMyStore() {
  return useStore<RootState>()
}

export {
  useMyStore
}

export default store
