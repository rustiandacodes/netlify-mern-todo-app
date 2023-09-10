import React from 'react';
import { connect } from 'react-redux';

const Alert = (props) => {
  return <div className={`${props.alert.msg === '' ? 'hidden' : 'block'} ${props.alert.status === 'success' ? 'bg-teal-500' : 'bg-red-500'} w-full p-3 rounded-lg text-white font-bold text-center mb-10`}>{props.alert.msg}</div>;
};

const mapStateToProps = (state) => {
  return {
    alert: state.alert,
  };
};

export default connect(mapStateToProps)(Alert);
