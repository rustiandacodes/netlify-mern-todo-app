const globalStore = {
  todoList: ['berhasil gaes'],
  updateFormPopUp: false,
};

const rootReducer = (state = globalStore, action) => {
  switch (action.type) {
    case 'SET_TODO_LIST':
      return {
        ...state,
        todoList: action.todoList,
      };
    case 'SET_POPUP':
      return {
        ...state,
        updateFormPopUp: action.updateFormPopUp,
      };
    default:
      return state;
  }
};

export default rootReducer;
