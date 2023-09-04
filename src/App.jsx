import CreateForm from './components/CreateForm';
import Navbar from './components/Navbar';
import Results from './components/Results';
import Footer from './components/Footer';
import UpdateForm from './components/UpdateForm';
import { connect } from 'react-redux';

const App = (props) => {
  console.log(props.popUp);
  return (
    <>
      <div className={`${props.popUp === false ? 'hidden' : 'fixed'} left-0 right-0 top-0 bottom-0 h-full bg-slate-800 opacity-70`}></div>
      <Navbar />
      <UpdateForm />
      <div className="bg-slate-50 md:px-0 px-10">
        <div className="container mx-auto pt-40">
          <CreateForm />
          <Results />
        </div>
      </div>
      <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
