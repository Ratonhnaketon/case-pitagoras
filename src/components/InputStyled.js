import React from 'react'
import '../assets/styles/components/Input.css'


function InputStyled({
  onChange,
  ...props
}) {
  return (
    <div>
      <input
        className='Input'
        onChange={e => onChange(e.target.value)}
        type='number'
        {...props}
      />
    </div>
  )
}

export default InputStyled;
