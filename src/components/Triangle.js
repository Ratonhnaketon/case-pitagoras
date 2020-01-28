import React, 
{
  useState,
  useEffect,
  useRef
} from 'react'
import '../assets/styles/components/Triangle.css' 
import { drawPolygon } from '../utils'


function Triangle({
  hypotenuse = 0, 
  oposing,
  adjacent,
}) {
  const canvas = useRef()
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480)

  useEffect(() => {
    const newWidth = window.innerWidth <= 480
    if (isMobile !== newWidth) {
      setIsMobile(newWidth)
    }
  }, [window.innerWidth])


  const thickness = isMobile ? 5 : 1 

  useEffect(() => {
    const { width, height } = canvas.current

    const {
      oposing: maxOposing,
      adjacent: maxAdjacent,
      hypotenuse: maxHypotenuse,
    } = calculateBaseValues({
      oposing,
      adjacent,
      hypotenuse,
      maxHeight: 0.7*height,
      maxWidth: 0.7*width,
    })

    const middle = [(width + maxAdjacent) / 2, (height - maxOposing) / 2]
    const angle = Math.atan2(maxOposing, maxAdjacent)
    const ctx = canvas.current.getContext('2d')
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 2
    if (oposing) {
      ctx.fillText(
        oposing,
        middle[0] + Math.sign(Math.cos(angle))*(5 + (Math.sign(adjacent) < 0 ? maxOposing.toString().length*5 : 0)),
        (2*middle[1] + maxOposing)/2
      )
      drawPolygon(ctx, [middle, [middle[0], middle[1] + maxOposing]], thickness)
      ctx.stroke()
    }
    if (adjacent) {
      ctx.fillText(
        adjacent,
        middle[0] - maxAdjacent/2,
        middle[1] + maxOposing + Math.sign(Math.sin(angle) + 0.01)*10,

      )
      drawPolygon(
        ctx,
        [
          [middle[0], middle[1] + maxOposing],
          [middle[0] - maxAdjacent, middle[1] + maxOposing]
        ],
        thickness
      )
      ctx.stroke()
    }
    if (hypotenuse && adjacent && oposing) {
      ctx.fillText(
        hypotenuse,
        middle[0] - maxHypotenuse*Math.cos(angle)/2 - (Math.sign(adjacent)*5 + ((adjacent > 0) ? hypotenuse.toString().length*5 : 0)),
        middle[1] + maxHypotenuse*Math.sin(angle)/2 - Math.sign(oposing)*5
      )
      drawPolygon(
        ctx,
        [
          [middle[0] - maxHypotenuse*Math.cos(angle), middle[1] + maxHypotenuse*Math.sin(angle)],
          middle
        ],
        thickness
      )
      ctx.stroke()
    }
  }, [oposing, adjacent, hypotenuse])

  return (
    <div className='Triangle-wrapper' >
      <canvas className='Canvas' ref={canvas}/>
    </div>
  )
}


function calculateBaseValues({ oposing, hypotenuse, adjacent, maxWidth, maxHeight }) {
  if (Math.abs(oposing) > maxHeight || Math.abs(oposing) < maxHeight * 0.7) {
    const ratio = Math.abs(maxHeight / oposing) 
    oposing = Math.sign(oposing)*maxHeight
    adjacent *= ratio
    hypotenuse = Math.abs(ratio * hypotenuse)
  }

  if (Math.abs(adjacent) > maxWidth) {
    const ratio = Math.abs(maxWidth / adjacent)
    adjacent = Math.sign(adjacent)*maxWidth
    oposing *= ratio
    hypotenuse = Math.abs(ratio * hypotenuse)
  }
  return { oposing, adjacent, hypotenuse }
}

export default Triangle
