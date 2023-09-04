import { useContext } from 'react';
import { TodoContext } from '../context/todoContext';

export const useTodosContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw Error('useTodoContext must be used inside an TodosContextProvider');
  }
  return context;
};
