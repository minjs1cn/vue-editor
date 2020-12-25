declare module '*.png' {
  const str: string
  export default str
}

declare module '*.jpg' {
  const str: string
  export default str
}

declare module '*.less'
declare module '*.css'

declare module '*.module.less' {
  const str: {
    [index: string]: string
  }
  export default str
}

declare module '*.module.css' {
  const str: {
    [index: string]: string
  }
  export default str
}