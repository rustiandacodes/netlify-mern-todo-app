import { connect } from 'react-redux';

const UpdateForm = (props) => {
  const labelStyle = 'font-bold mb-3';
  const labelWrapper = 'flex flex-col mb-5';
  const submitBtn = 'bg-teal-500 text-white p-3 rounded-lg font-bold';

  const handleUpdate = async (e) => {
    e.preventDefault();
    const title = props.temporaryTitle;
    const description = props.temporaryDescription;
    const todo = { title, description };
    const response = await fetch(`${import.meta.env.VITE_API_URL}/.netlify/functions/api/${props.temporaryId}`, {
      method: 'PATCH',
      body: JSON.stringify(todo),
      headers: {
        'Content-type': 'application/json',
      },
    });
    props.handlePopUp(false);
    if (!response.ok) {
      props.setAlert({ msg: '❌ Failed to update todo', status: 'failed' });
    } else {
      props.setAlert({ msg: '✅ Successfully updated todo', status: 'success' });
      getTodoList();
    }
  };

  const getTodoList = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/.netlify/functions/api`);
    const result = await response.json();
    props.setTodoList(result);
  };

  return (
    <>
      <div className={`${props.popUp === true ? 'fixed' : 'hidden'} mt-32 w-full p-10 md:p-10 z-10`}>
        <form className="p-10 relative bg-slate-100 rounded-lg shadow-lg mx-auto md:w-1/2">
          <span
            className="absolute right-8 top-5 font-bold text-xl cursor-pointer text-slate-700"
            onClick={() => {
              props.handlePopUp(false);
            }}
          >
            x
          </span>
          <p className="py-8 text-2xl font-bold text-center">Edit Todo</p>
          <div className={labelWrapper}>
            <label className={labelStyle}>Title :</label>
            <input
              className="p-3 rounded-lg outline-none"
              type="text"
              placeholder="Add title here..."
              value={props.temporaryTitle}
              onChange={(e) => {
                props.handleTemporaryTitle(e.target.value);
              }}
            />
          </div>
          <div className={labelWrapper}>
            <label className={labelStyle}>Description : </label>
            <textarea
              className="rounded-lg p-3 outline-none"
              cols="30"
              rows="10"
              placeholder="Add description here..."
              value={props.temporaryDescription}
              onChange={(e) => {
                props.handleTemporaryDescription(e.target.value);
              }}
            ></textarea>
          </div>
          <button className={submitBtn} onClick={(e) => handleUpdate(e)}>
            Update
          </button>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    todoList: state.todoList,
    popUp: state.updateFormPopUp,
    temporaryId: state.temporaryId,
    temporaryTitle: state.temporaryTitle,
    temporaryDescription: state.temporaryDescription,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (result) => dispatch({ type: 'SET_MESSAGE', alert: result }),
    setTodoList: (result) => dispatch({ type: 'SET_TODO', todoList: result }),
    handlePopUp: (result) => dispatch({ type: 'SET_POPUP', updateFormPopUp: result }),
    handleTemporaryTitle: (result) => dispatch({ type: 'TEMPORARY_TITLE', todo: result }),
    handleTemporaryDescription: (result) => dispatch({ type: 'TEMPORARY_DESCRIPTION', todo: result }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateForm);
