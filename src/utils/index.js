import axios from 'axios'

const config = {
  'Content-Type': 'application/json',
}

export async function request(url, payload) {
  return axios.post(url, payload, config) 
}

export function defaultValue(value, def) {
  return value ? value : def
}


export function drawPolygon(ctx, points, radius) {
  (radius > 0 ? points : getRoundedPoints(points, radius))
  .forEach((point, index) => {
    if (index === 0) {
      ctx.beginPath()
      ctx.moveTo(point[0], point[1])
    } else {
      ctx.lineTo(point[0], point[1])
    }
    if (radius > 0) {
      ctx.quadraticCurveTo(point[2], point[3], point[4], point[5])
    }
  })
  ctx.closePath()
}
  
function getRoundedPoints(points, radius) {
  let i1, i2, i3, p1, p2, p3, prevPt, nextPt,
      len = points.length,
      res = new Array(len)
  for (i2 = 0; i2 < len; i2++) {
    i1 = i2-1
    i3 = i2+1
    if (i1 < 0) {
      i1 = len - 1
    }
    if (i3 === len) {
      i3 = 0
    }
    p1 = points[i1]
    p2 = points[i2]
    p3 = points[i3]
    prevPt = getRoundedPoint(p1[0], p1[1], p2[0], p2[1], radius, false)
    nextPt = getRoundedPoint(p2[0], p2[1], p3[0], p3[1], radius, true)
    res[i2] = [prevPt[0], prevPt[1], p2[0], p2[1], nextPt[0], nextPt[1]]
  }
  return res
}
  
function getRoundedPoint(x1, y1, x2, y2, radius, first) {
  const total = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)),
        idx = first ? radius / total : (total - radius) / total
  return [x1 + (idx * (x2 - x1)), y1 + (idx * (y2 - y1))]
}
