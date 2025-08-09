import { createContext, useContext, useReducer } from "react";

const CalcContext = createContext();

const initialState = {
  value1: "",
  value2: "",
  operand: "",
  output: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "value/selected":
      if (state.output) return { ...state };
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
      if (state.output !== null)
        return {
          ...state,
          value1: state.output.toString(),
          value2: "",
          output: null,
          operand: action.payload,
        };
      if (!state.value1 || state.value2) return;
      return {
        ...state,
        operand: action.payload,
      };

    case "operation/selected":
      if (!state.value1 || !state.value2 || !state.operand) return { ...state };
      if (state.operand === "+")
        return { ...state, output: +state.value1 + +state.value2 };
      if (state.operand === "/")
        return { ...state, output: +state.value1 / +state.value2 };
      if (state.operand === "*")
        return { ...state, output: +state.value1 * +state.value2 };
      if (state.operand === "-")
        return { ...state, output: +state.value1 - +state.value2 };
      return;

    case "delete/selected":
      if (state.output) return { ...state };
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
      };

    default: {
      throw new Error("Unknown action type");
    }
  }
}
function CalcProvider({ children }) {
  const [{ value1, value2, operand, output }, dispatch] = useReducer(
    reducer,
    initialState
  );

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

  return (
    <CalcContext.Provider
      value={{
        value1,
        value2,
        operand,
        output,
        handleValue,
        handleOperand,
        handleOperation,
        handleClear,
        handleDelete,
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
