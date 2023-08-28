import React from "react";
import { UserInfo } from "./types/userInfo";

type AppState = {
  mode: string;
  userInfo?: UserInfo;
};

const initialState: AppState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null,

  mode: localStorage.getItem("mode")
    ? localStorage.getItem("mode")!
    : window.matchMedia &&
      window.matchMedia("prefers-color-scheme: dark").matches
    ? "dark"
    : "light",
};

type Action =
  | { type: "SWITCH_MODE" }
  | { type: "USER_SIGNIN"; payload: UserInfo }
  | { type: "USER_SIGNOUT" };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SWITCH_MODE":
      return { mode: state.mode === "dark" ? "light" : "dark" };

    case "USER_SIGNIN":
      return { ...state, userInfo: { ...action.payload } };

    case "USER_SIGNOUT":
      return {
        mode:
          window.matchMedia &&
          window.matchMedia("prefers-color-scheme: dark").matches
            ? "dark"
            : "light",
      };
    default:
      return state;
  }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState;

const Store = React.createContext({
  state: initialState,
  dispatch: defaultDispatch,
});

function StoreProvider(props: React.PropsWithChildren<object>) {
  const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState
  );
  return <Store.Provider value={{ state, dispatch }} {...props} />;
}

export { Store, StoreProvider };
