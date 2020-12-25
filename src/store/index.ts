import { CSSProperties } from 'vue'
import { createStore, useStore } from 'vuex'

interface Component {
  id: number
  name: string
  component: string
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
  currentComponent: Node | null
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
    currentComponent: null,
  },
  actions: {
    addComponent({ state }, { component }) {
      state.work.page.nodes.push({
        ...component,
        style: {
          position: 'absolute',
          left: '0px',
          top: '0px',
          width: '200px',
          height: '200px',
          zIndex: 0,
          cursor: 'pointer'
        },
        _uid: ++_uid
      })
    },
    setCurrent({ state }, { component }) {
      state.currentComponent = component
    },
    setPosition({ state }, { x, y }) {
      state.currentComponent.style.left = parseFloat(state.currentComponent.style.left as string) + x + 'px'
      state.currentComponent.style.top = parseFloat(state.currentComponent.style.top as string) + y + 'px'
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
