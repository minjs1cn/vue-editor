import { defineComponent, onMounted, reactive, ref } from 'vue'
import Tabs from '../../../../components/tabs'

const Test = defineComponent({
  setup() {
    const count = ref(1)

    onMounted(() => {
      setInterval(() => {
        count.value++
      }, 1000)
    })

    return {
      count
    }
  },

  render() {
    return (
      <>
        <div>{this.count}</div>
        <div>1</div>
        <div>1</div>
      </>
    )
  }
})

export default defineComponent({
  setup() {
    const state = reactive({
      activekey: '1'
    })

    return {
      state,
      onChange: (key: string) => {
        console.log(key)
      }
    }
  },

  render() {
    const { state } = this

    return (
      <div>
        <Tabs defaultActiveKey={state.activeKey}>
          <Tabs.TabPane key={'1'} tab={'属性'}>1</Tabs.TabPane>
          <Tabs.TabPane key={'2'} tab={'事件'}>2</Tabs.TabPane>
          <Tabs.TabPane key={'3'} tab={'数据'}>3</Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
})