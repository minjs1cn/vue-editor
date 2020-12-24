import { createStore } from 'vuex'

interface Component {
  id: number
  name: string
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

interface Node {

}

export interface RootState {
  components: Array<Component>
  work: Work,
  works: Array<Work>,
  currentComponent: Component | null
}

const store = createStore<RootState>({
  state: {
    components: [
      {
        id: 1,
        name: '大转盘'
      },
      {
        id: 2,
        name: '刮刮卡'
      },
      {
        id: 3,
        name: '翻牌子'
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

  getters: {
    page(state) {
      return state.work.page
    }
  }
})

export default store
