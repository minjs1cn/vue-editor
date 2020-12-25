import { defineComponent, h, PropType } from 'vue'
import Node from '../node'
import packages from '../../../../packages'
import { Node as NodeType } from '../../../../store'

export default defineComponent({
  props: {
    nodes: {
      type: Object as PropType<Array<NodeType>>,
      default: () => ([])
    }
  },

  setup(props) {
    return () => <div style={{
      position: 'relative'
    }}>
      {props.nodes.map(node => (
        <Node style={node.style} uid={node._uid}>{h(packages[node.component])}</Node>
      ))}
    </div>
  }
})