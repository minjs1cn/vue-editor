import { UserConfig } from 'vite'
import path from 'path'

const resolve = (p: string) => path.resolve(__dirname, p)

const config: UserConfig = {
  alias: {
    '/@/': resolve('./src')
  },
  cssPreprocessOptions: {
    less: {
      modifyVars: {
        'primary-color': '#1890ff',
        'info-color': '#722ed1',
        'success-color': '#52c41a',
        'processing-color': '#1890ff',
        'error-color': '#f5222d',
        'warning-color': '#faad14',
        'normal-color': '#d9d9d9',
        'white': '#fff',
        'black': '#000',
        'body-background': '#fff',
        'border-color': '#f5f5f5'
      }
    }
  }
}

export default config