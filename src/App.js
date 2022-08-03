import './App.css';
import {useReducer} from "react";
import DigitsButton from "./components/DigitsButton";

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose_operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete_digit',
  EVALUATE: 'evaluate'
}

function reducer(state,{type,payload}) {
  switch (type){
    case ACTIONS.ADD_DIGIT:
      return{
        ...state,
        currentOperand: `${state.currentOperand || ""} ${payload.digit}`,
      }
  }
}

function App() {

  const [{currentOperand, previousOperand,operation}, dispatch] = useReducer(reducer, {});
  return (
      <section className='grid'>
        <div className='output'>
          <div className='previous-operand'>{previousOperand} {operation}</div>
          <div className='current-operand'>{currentOperand}</div>
        </div>
          <button className='spanTwo'>AC</button>
          <button>DEL</button>
          <button>/</button>
          <DigitsButton digit='1' dispatch={dispatch}>1</DigitsButton>
          <DigitsButton digit='2' dispatch={dispatch}>2</DigitsButton>
          <DigitsButton digit='3' dispatch={dispatch}>3</DigitsButton>
          <DigitsButton digit='*' dispatch={dispatch}>*</DigitsButton>
          <DigitsButton digit='4' dispatch={dispatch}>4</DigitsButton>
          <DigitsButton digit='5' dispatch={dispatch}>5</DigitsButton>
          <DigitsButton digit='6' dispatch={dispatch}>6</DigitsButton>
          <DigitsButton digit='+' dispatch={dispatch}>+</DigitsButton>
          <DigitsButton digit='7' dispatch={dispatch}>7</DigitsButton>
          <DigitsButton digit='8' dispatch={dispatch}>8</DigitsButton>
          <DigitsButton digit='9' dispatch={dispatch}>9</DigitsButton>
          <button>-</button>
          <button>.</button>
        <DigitsButton digit='0' dispatch={dispatch}>0</DigitsButton>
          <button className='spanTwo'>=</button>
      </section>
  );
}

export default App;
