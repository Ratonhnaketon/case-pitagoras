import React, { useEffect, useState } from 'react'
import InputStyle from './InputStyled'
import '../assets/styles/components/Expression.css'
import { defaultValue } from '../utils'

const ROUND_BASE = 1000

function Expression({
  hypotenuse,
  oposing,
  setOposing,
  adjacent,
  setAdjacent,
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480)

  useEffect(() => {
    const newWidth = window.innerWidth <= 480
    if (isMobile !== newWidth) {
      setIsMobile(newWidth)
    }
  }, [window.innerWidth])

  const showHypotenuse = isMobile ? Math.round(hypotenuse*ROUND_BASE)/ROUND_BASE : hypotenuse
  return (
    <div className='Expression' >
      {`${defaultValue((oposing && adjacent) ? showHypotenuse : 0, 'a')}² =`}
      <InputStyle
        value={oposing}
        placeholder='b'
        onChange={setOposing}
      />
      {'² + '}
      <InputStyle
        value={adjacent}
        placeholder='c'
        onChange={setAdjacent}
      />
      ²
    </div>
  )
}

export default Expression;
