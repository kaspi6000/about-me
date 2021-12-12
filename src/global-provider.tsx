import React, {useReducer, useContext, createContext, Dispatch} from 'react'
import {ACTION_TYPES} from './constants'

type State = {
  userInfo: any
  isLogin: boolean
}

type Action = {type: keyof typeof ACTION_TYPES, data?: any}

const INITIAL_STATE: State = {
  userInfo: {},
  isLogin: false,
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'USER_SIGN_IN':
      return {...state, userInfo: action.data, isLogin: true}
    case 'USER_SIGN_OUT':
      return {...state, userInfo: {}, isLogin: false}
    default:
      return {...state}
  }
}

const DispatchContext = createContext<Dispatch<Action>>(() => null)
const StateContext = createContext<State>(INITIAL_STATE)

// Global Store
export const GlobalProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

    return (
        <DispatchContext.Provider value={ dispatch }>
            <StateContext.Provider value={ state }>
                { children }
            </StateContext.Provider>
        </DispatchContext.Provider>
    )
}

// Dispatch
export const useGlobalDispatch = () => {
    return useContext(DispatchContext)
}

// Get state
export const useGlobalState: () => State = () => {
    const state = useContext(StateContext)
    return state
}
