const globalStore = {
  todoList: [''],
  temporaryId: '',
  temporaryTitle: '',
  temporaryDescription: '',
  updateFormPopUp: false,
  alert: { msg: '', status: '' },
};

const rootReducer = (state = globalStore, action) => {
  switch (action.type) {
    case 'SET_TODO':
      return {
        ...state,
        todoList: action.todoList,
      };
    case 'ADD_TODO':
      return {
        ...state,
        todoList: state.todoList.concat(action.newTodo),
      };
    case 'TEMPORARY_ID':
      return {
        ...state,
        temporaryId: action.todo,
      };
    case 'TEMPORARY_TITLE':
      return {
        ...state,
        temporaryTitle: action.todo,
      };
    case 'TEMPORARY_DESCRIPTION':
      return {
        ...state,
        temporaryDescription: action.todo,
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todoList: state.todoList.filter((todo) => todo._id !== action.deleteTodo._id),
      };
    case 'SET_POPUP':
      return {
        ...state,
        updateFormPopUp: action.updateFormPopUp,
      };
    case 'SET_MESSAGE':
      return {
        ...state,
        alert: action.alert,
      };

    default:
      return state;
  }
};

export default rootReducer;
