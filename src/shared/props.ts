import { ComponentPublicInstance, CSSProperties, Fragment, VNode } from 'vue'

export function getSlot(self: ComponentPublicInstance, name = 'default', options = {}) {
  return flattenChildren(self.$slots[name](options))
}

export function isValid(value: any): boolean {
  return value !== undefined && value !== null && value !== '';
}

export function flattenChildren(children: Array<VNode> | string) {
  const temp = Array.isArray(children) ? children : [children]
  const res = []

  temp.forEach(child => {
    if (Array.isArray(child)) {
      res.push(...flattenChildren(child))
    } else if (child && child.type === Fragment) {
      res.push(...flattenChildren(child.children))
    } else if(isValid(child)) {
      res.push(child)
    }
  })

  return res
}

const StyleUnits = ['width', 'height', 'left', 'top']

export function styleUnit(style: CSSProperties): CSSProperties {
  const result = {}
  Object.keys(style).forEach(key => {
    if (StyleUnits.includes(key)) {
      result[key] = style[key] + 'px'
    } else {
      result[key] = style[key]
    }
  })
  return result
}