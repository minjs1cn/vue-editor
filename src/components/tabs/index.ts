import { App } from 'vue'
import Tabs from './tabs'
import TabPane from './tabs-pane'

Tabs.TabPane = TabPane

Tabs.install = function(app: App) {
  app.component(Tabs.name, Tabs)
  app.component(Tabs.TabPane.name, Tabs.TabPane)
  return app
}

export default Tabs as typeof Tabs & Plugin & {
  readonly TabPane: typeof TabPane
}

export {
  Tabs,
  TabPane
}
