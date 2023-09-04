import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const Results = (props) => {
  const [datas, setData] = useState([]);

  const fetchData = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/.netlify/functions/api`);
    const result = await response.json();
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="container mx-auto py-32">
        <h2 className="text-xl font-bold text-teal-500 mb-10">Your Todo List :</h2>
        {datas.map((data, i) => {
          return (
            <div key={i} className="bg-white py-10 flex justify-around items-center rounded-lg mb-10 md:px-10 px-5">
              <div className="w-[80%]">
                <h3 className="text-lg font-bold text-teal-500">Some Title</h3>
                <p>{data.data}</p>
              </div>
              <div className="flex flex-col md:flex-row w-[20%] gap-2">
                <p className="p-2 md:w-20 text-white font-semibold rounded-xl text-center cursor-pointer bg-red-500">Delete</p>
                <p
                  className="p-2 md:w-20 text-white font-semibold rounded-xl text-center cursor-pointer bg-sky-500"
                  onClick={() => {
                    props.handlePopUp(true);
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handlePopUp: (result) => dispatch({ type: 'SET_POPUP', updateFormPopUp: result }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
