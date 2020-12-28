import { Node } from "../../../../store";

/**
 * 选中组件是否是当前组件
 * @param state 
 * @param component 
 */
export function isCurrentComponent(currentNode: Node, node: Node) {
  return currentNode && currentNode._uid === node._uid
}