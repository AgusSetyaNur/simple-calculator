import { createContext, useContext, useReducer } from "react";
import { evaluate } from "mathjs/number";

const CalcContext = createContext();

const initialState = {
  chainingValue: "",
  value1: "",
  value2: "",
  operand: "",
  output: null,
  chainingMode: false,
};

const operandVal = ["+", "-", "*", "/"];

function reducer(state, action) {
  switch (action.type) {
    case "value/selected":
      if (state.output !== null) return state;
      if (action.payload === "." && !state.chainingValue && state.chainingMode)
        return state;
      if (state.chainingMode)
        return {
          ...state,
          chainingValue: state.chainingValue + action.payload,
        };

      if (action.payload === "." && !state.value1) return state;
      if (state.operand)
        return {
          ...state,
          value2: state.value2 + action.payload,
        };
      return {
        ...state,
        value1: state.value1 + action.payload,
      };

    case "operand/selected":
      const lastChar = state.chainingValue.at(-1);
      const isLastOperand = operandVal.includes(lastChar);
      if (!state.chainingValue && state.chainingMode) return state;
      if (state.output !== null && state.chainingMode)
        return {
          ...state,
          chainingValue: state.output.toString() + action.payload,
          output: null,
        };
      if (state.chainingMode)
        return {
          ...state,
          chainingValue: isLastOperand
            ? state.chainingValue.slice(0, -1) + action.payload
            : state.chainingValue + action.payload,
        };

      if (state.output !== null)
        return {
          ...state,
          value1: state.output.toString(),
          value2: "",
          output: null,
          operand: action.payload,
        };
      if (!state.value1 || state.value2) return state;
      return {
        ...state,
        operand: action.payload,
      };

    case "operation/selected":
      if (operandVal.includes(state.chainingValue.at(-1))) return state;
      if (!state.chainingValue && state.chainingMode) return state;
      if (state.chainingMode)
        return {
          ...state,
          output: evaluate(state.chainingValue),
        };
      if (!state.value1 || !state.value2 || !state.operand) return state;

      const ops = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b,
      };

      const calc = ops[state.operand];
      return {
        ...state,
        output: calc(+state.value1, +state.value2),
      };

    case "chaining/toggled":
      return {
        ...state,
        chainingMode: !state.chainingMode,
        output: null,
      };

    case "delete/selected":
      if (state.output) return { ...state };
      if (state.chainingValue)
        return { ...state, chainingValue: state.chainingValue.slice(0, -1) };
      if (state.value2) return { ...state, value2: state.value2.slice(0, -1) };
      if (state.operand)
        return {
          ...state,
          operand: "",
        };
      return {
        ...state,
        value1: state.value1 ? state.value1.slice(0, -1) : state.value1,
      };

    case "clear/selected":
      return {
        ...initialState,
        chainingMode: state.chainingMode,
      };

    default: {
      throw new Error("Unknown action type");
    }
  }
}
function CalcProvider({ children }) {
  const [
    { value1, value2, operand, output, chainingMode, chainingValue },
    dispatch,
  ] = useReducer(reducer, initialState);

  function handleValue(value) {
    dispatch({ type: "value/selected", payload: value });
  }

  function handleOperand(operand) {
    dispatch({ type: "operand/selected", payload: operand });
  }

  function handleOperation() {
    dispatch({ type: "operation/selected" });
  }

  function handleClear() {
    dispatch({ type: "clear/selected" });
  }

  function handleDelete() {
    dispatch({ type: "delete/selected" });
  }

  function handleChaining() {
    dispatch({ type: "chaining/toggled" });
  }

  return (
    <CalcContext.Provider
      value={{
        value1,
        value2,
        operand,
        output,
        chainingValue,
        chainingMode,
        handleValue,
        handleOperand,
        handleOperation,
        handleClear,
        handleDelete,
        handleChaining,
      }}
    >
      {children}
    </CalcContext.Provider>
  );
}

function useCalc() {
  const context = useContext(CalcContext);
  if (context === undefined)
    throw new Error("CalcContext can't be used outside CalcContext.Provider");
  return context;
}

export { CalcProvider, useCalc };
