import { defineComponent, onUpdated } from 'vue'

export default defineComponent({
  props: {
    width: Number,
    height: Number
  },

  setup(props) {

    onUpdated(() => {
      console.log('update')
      const canvas: HTMLCanvasElement = document.querySelector('#ruler')
      canvas.width = props.width
      canvas.height = props.height
      const ctx = canvas.getContext('2d')
      for (let x = 10; x < props.width; x+=5) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          if (x % 100 === 0) {
            ctx.lineTo(x, 10)
          } else {
            ctx.lineTo(x, 5)
          }
          ctx.stroke()
          ctx.closePath()
      }
      for (let y = 10; y < props.height; y+=5) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        if (y % 100 === 0) {
          ctx.lineTo(10, y)
        } else {
          ctx.lineTo(5, y)
        }
        ctx.stroke()
        ctx.closePath()
    }
    })

    return () => (
      <canvas id={'ruler'} style={{
        width: '100%',
        height: '100%'
      }}></canvas>
    )
  }
})