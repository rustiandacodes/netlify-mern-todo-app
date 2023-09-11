import { useEffect } from 'react';
import { connect } from 'react-redux';

const Results = (props) => {
  const getTodoList = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/.netlify/functions/api`);
    const result = await response.json();
    props.setTodoList(result);
  };

  useEffect(() => {
    getTodoList();
  }, []);

  const handleDete = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/.netlify/functions/api/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      props.setAlert({ msg: '❌ Failed to delete todo', status: 'failed' });
    } else {
      props.setAlert({ msg: '✅ Successfully deleted todo', status: 'success' });
      getTodoList();
    }
  };

  const handleUpdate = async (todo) => {
    props.handleTemporaryId(todo._id);
    props.handleTemporaryTitle(todo.title);
    props.handleTemporaryDescription(todo.description);
  };

  return (
    <>
      <div className="container mx-auto py-32">
        <h2 className="text-xl font-bold text-teal-500 mb-10">Your Todo List :</h2>
        {props.todoList.toReversed().map((todo, i) => {
          return (
            <div key={i} className="bg-white py-10 flex justify-around items-center rounded-lg mb-10 md:px-10 px-5">
              <div className="w-[80%]">
                <h3 className="text-lg font-bold text-teal-500">{todo.title}</h3>
                <p>{todo.description}</p>
              </div>
              <div className="flex flex-col md:flex-row w-[20%] gap-2">
                <p
                  className="p-2 md:w-20 text-white font-semibold rounded-xl text-center cursor-pointer bg-red-500"
                  onClick={() => {
                    handleDete(todo._id);
                  }}
                >
                  Delete
                </p>
                <p
                  className="p-2 md:w-20 text-white font-semibold rounded-xl text-center cursor-pointer bg-sky-500"
                  onClick={() => {
                    props.handlePopUp(true);
                    handleUpdate(todo);
                  }}
                >
                  Edit
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    todoList: state.todoList,
    popUp: state.updateFormPopUp,
    alert: state.alert,
    temporaryId: state.temporaryId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handlePopUp: (result) => dispatch({ type: 'SET_POPUP', updateFormPopUp: result }),
    setTodoList: (result) => dispatch({ type: 'SET_TODO', todoList: result }),
    handleDeleteTodo: (result) => dispatch({ type: 'DELETE_TODO', deleteTodo: result }),
    setAlert: (result) => dispatch({ type: 'SET_MESSAGE', alert: result }),
    handleTemporaryId: (result) => dispatch({ type: 'TEMPORARY_ID', todo: result }),
    handleTemporaryTitle: (result) => dispatch({ type: 'TEMPORARY_TITLE', todo: result }),
    handleTemporaryDescription: (result) => dispatch({ type: 'TEMPORARY_DESCRIPTION', todo: result }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
