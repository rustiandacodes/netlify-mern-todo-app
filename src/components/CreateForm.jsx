import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';

const CreateForm = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    const todo = { title, description };
    const response = await fetch(`${import.meta.env.VITE_API_URL}/.netlify/functions/api`, {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const json = await response.json();
    props.handleSubmit(json);
    setTitle('');
    setDescription('');
    if (!response.ok) {
      props.setAlert({ msg: '❌ Failed to create new todo', status: 'failed' });
    } else {
      props.setAlert({ msg: '✅ Successfully added todo', status: 'success' });
      getTodoList();
    }
  };

  const labelStyle = 'font-bold mb-3';
  const labelWrapper = 'flex flex-col mb-5';
  const submitBtn = 'bg-teal-500 text-white p-3 rounded-lg font-bold';

  return (
    <>
      <div>
        <form>
          <div className={labelWrapper}>
            <label className={labelStyle}>Title :</label>
            <input
              className="p-3 rounded-lg outline-none"
              type="text"
              placeholder="Add title here..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
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
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>
        </form>
        <button className={submitBtn} onClick={() => handleSubmit()}>
          Submit
        </button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    todoList: state.todoList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: (result) => dispatch({ type: 'ADD_TODO', newTodo: result }),
    setAlert: (result) => dispatch({ type: 'SET_MESSAGE', alert: result }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateForm);
