import { defineComponent } from 'vue'
import Tabs from '../../../../components/tabs'

export default defineComponent({
  render() {
    return (
      <div>
        <Tabs defaultActiveKey={'1'}>
          <Tabs.TabsPane key={'1'}></Tabs.TabsPane>
          <Tabs.TabsPane key={'2'}></Tabs.TabsPane>
          <Tabs.TabsPane key={'3'}></Tabs.TabsPane>
        </Tabs>
      </div>
    )
  }
})