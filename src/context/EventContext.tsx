import React, { createContext, useReducer, ReactNode } from 'react';
import { IEvent } from '../interfaces/event';

// State interface
interface State {
  events: IEvent[] | null;
}

// Action interface
interface Action {
  type: string;
  payload: any; // veya daha spesifik bir tip
}

// Context için beklenen değer tipi
export const EventContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

// Reducer fonksiyonu
export const eventsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_EVENTS':
      return {
        ...state,
        events: action.payload,
      };
    case 'CREATE_EVENT':
      return {
        ...state,
        events: state.events ? [action.payload, ...state.events] : [action.payload],
      };
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events && state.events.filter((e) => e._id !== action.payload._id),
      };
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events && state.events.map((event) => (event._id === action.payload._id ? action.payload : event)),
      };
    default:
      return state;
  }
};

// EventContextProvider bileşeni
interface Props {
  children: ReactNode;
}

export const EventContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(eventsReducer, {
    events: null,
  });

  return <EventContext.Provider value={{ state, dispatch }}>{children}</EventContext.Provider>;
};
