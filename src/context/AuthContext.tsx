import React, { createContext, useReducer, Dispatch, useEffect } from 'react';
import axios from 'axios';

import { ReactNode } from 'react';

interface Action {
  type: string;
  payload?: any;
}

interface AuthContextProps {
  state: IState;
  dispatch: Dispatch<Action>;
}

interface IState {
  user: any;
}

const initialState: IState = {
  user: null,
};

export const AuthContext = createContext<AuthContextProps>({
  state: initialState,
  dispatch: () => null,
});

export const authReducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case 'LOGIN':
      axios.defaults.headers.common['Authorization'] = `Bearer" ${action.payload.token}`;
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedData = localStorage.getItem('user');
    const user = storedData ? JSON.parse(storedData) : null;

    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []);

  console.log('AuthContext state: ', state);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};
