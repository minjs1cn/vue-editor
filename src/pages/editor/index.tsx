import { defineComponent } from 'vue'
import Layout from './components/layout'
import Header from './components/header'
import Aside from './components/aside'
import Content from './components/content'
import Panel from './components/panel'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRouter()
    console.log(route)
  },

  render() {
    const slots = {
      header: <Header />,
      aside: <Aside />,
      content: <Content />,
      panel: <Panel />
    }

    return (
      <Layout>
        {slots}
      </Layout>
    )
  }
})