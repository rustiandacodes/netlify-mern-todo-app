import { createContext, useReducer } from 'react';

export const TodoContext = createContext();

export const todosReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TODO':
      return {
        todo: action.payload,
      };
    case 'CREATE_TODO':
      return {
        todo: [action.payload, ...state.todo],
      };
    case 'DELETE_TODO':
      return {
        todo: state.todo.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const TodosContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todosReducer, { todo: null });

  return <TodosContext.Provider value={{ ...state, dispatch }}>{children}</TodosContext.Provider>;
};
