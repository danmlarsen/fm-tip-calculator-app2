import { createContext, Dispatch, useContext, useReducer } from "react";

type CalculatorContextValue = {
  state: typeof initialState;
  dispatch: Dispatch<CalculatorAction>;
};

type TInitialState = {
  tipPercent: null | number;
  tipAmount: number;
  total: number;
  submitted: boolean;
};

const initialState: TInitialState = {
  tipPercent: null,
  tipAmount: 55.23,
  total: 123.12,
  submitted: false,
};

type CalculatorAction =
  | { type: "setResult"; payload: { tipAmount: number; total: number } }
  | { type: "selectTipPercent"; payload: number }
  // | { type: "updateBill"; payload: number }
  // | { type: "updateNumPeople"; payload: number }
  | { type: "reset" };

function reducer(state: typeof initialState, action: CalculatorAction) {
  switch (action.type) {
    case "setResult":
      return { ...state };
    case "selectTipPercent":
      return {
        ...state,
        tipPercent: action.payload,
      };
    // case "updateBill":
    //   return { ...state, bill: action.payload };
    // case "updateNumPeople":
    //   return { ...state, numPeople: action.payload };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

const CalculatorContext = createContext({} as CalculatorContextValue);

export function CalculatorContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CalculatorContext.Provider value={{ state, dispatch }}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const context = useContext(CalculatorContext);
  return context;
}
