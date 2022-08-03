import './App.css';
import {useReducer} from "react";
import DigitsButton from "./components/DigitsButton";
import OperationsButton from "./components/OperationsButton";

export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose_operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete_digit',
    EVALUATE: 'evaluate',
}

function reducer(state, {type, payload}) {
    switch (type) {
        case ACTIONS.ADD_DIGIT:
            if(payload.digit === '0' && state.currentOperand === '0'){
                return state
            }
            if(payload.digit === '.' && state.currentOperand.includes('.')) {
                return state
            }
            return {
                ...state,
                currentOperand: `${state.currentOperand || ""}${payload.digit}`,
            }
        case ACTIONS.CHOOSE_OPERATION:
            if(state.currentOperand == null && state.previousOperand == null){
                return state
            }
            if(state.currentOperand == null){
                return {
                    ...state,
                    operation: payload.operation,
                }
            }
            if(state.previousOperand == null){
                return{
                    ...state,
                    operation: payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: null,
                }
            }
            return{
                ...state,
                previousOperand: evaluate(state),
                operation: payload.operation,
                currentOperand: null,
            }

        case ACTIONS.CLEAR:
            return {}
    }
}

function evaluate({currentOperand,previousOperand,operation}){
    const previous = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    if(isNaN(current) || isNaN(previous)){
        return ""
    }
    let computation = ''
    switch (operation){
        case '+': computation = previous + current
            break
        case '-': computation = previous - current
            break
        case '*': computation = previous * current
            break
        case '/': computation = previous / current
            break
    }
    return computation.toString()
}

function App() {

    const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {});
    return (
        <section className='grid'>
            <div className='output'>
                <div className='previous-operand'>{previousOperand} {operation}</div>
                <div className='current-operand'>{currentOperand}</div>
            </div>
            <button className='spanTwo'
                    onClick={()=> dispatch({ type: ACTIONS.CLEAR})}>AC</button>
            <button
                onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
            <OperationsButton operation='/' dispatch={dispatch}/>
            <DigitsButton digit='1' dispatch={dispatch}/>
            <DigitsButton digit='2' dispatch={dispatch}/>
            <DigitsButton digit='3' dispatch={dispatch}/>
            <OperationsButton operation='*' dispatch={dispatch}/>
            <DigitsButton digit='4' dispatch={dispatch}/>
            <DigitsButton digit='5' dispatch={dispatch}/>
            <DigitsButton digit='6' dispatch={dispatch}/>
            <OperationsButton operation='+' dispatch={dispatch}/>
            <DigitsButton digit='7' dispatch={dispatch}/>
            <DigitsButton digit='8' dispatch={dispatch}/>
            <DigitsButton digit='9' dispatch={dispatch}/>
            <OperationsButton operation='-' dispatch={dispatch}/>
            <DigitsButton digit='.' dispatch={dispatch}/>
            <DigitsButton digit='0' dispatch={dispatch}/>
            <button className='spanTwo'>=</button>
        </section>
    );
}

export default App;
