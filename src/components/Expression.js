import React from 'react'
import InputStyle from './InputStyled'
import '../assets/styles/components/Expression.css'
import { defaultValue } from '../utils'


function Expression({
  hypotenuse,
  oposing,
  setOposing,
  adjacent,
  setAdjacent,
}) {
  return (
    <div className='Expression' >
      {`${defaultValue((oposing && adjacent) ? hypotenuse : 0, 'a')}² =`}
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
