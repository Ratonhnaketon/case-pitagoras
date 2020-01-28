import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import action from './actions'
import './assets/styles/App.css'
import { Expression, Triangle } from './components'

function App() {
  const [oposing, setOposing] = useState('');
  const [adjacent, setAdjacent] = useState('');
  const { hypotenuse } = useSelector(({ reducer }) => ({ ...reducer })) 

  const actionDispatcher = useDispatch()
  
  useEffect(() => {
    if (adjacent && oposing) {
      actionDispatcher(action({
        cat_op: parseInt(oposing),
        cat_adj: parseInt(adjacent),
      }))
    }
  }, [adjacent, oposing])

  return (
    <div className='App' >
      <header className='App-header'>
        <h1 className='Title' >Calculadora para o Teorema de Pitagoras</h1>
        <h4 className='Description' >Mude os valores de b e c na expressão abaixo para descobrir o valor da hipotenusa</h4>
        <div className='App-wrapper' >
          <Expression
            adjacent={adjacent}
            hypotenuse={hypotenuse}
            oposing={oposing}
            setOposing={setOposing}
            setAdjacent={setAdjacent}
          />
          <Triangle
            hypotenuse={hypotenuse}
            oposing={(oposing ? parseInt(oposing) : 0)}
            adjacent={(adjacent ? parseInt(adjacent) : 0)}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
