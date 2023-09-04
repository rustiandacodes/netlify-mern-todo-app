import React from 'react';

const createForm = () => {
  const labelStyle = 'font-bold mb-3';
  const labelWrapper = 'flex flex-col mb-5';
  const submitBtn = 'bg-teal-500 text-white p-3 rounded-lg font-bold';
  return (
    <>
      <div>
        <form>
          <div className={labelWrapper}>
            <label className={labelStyle}>Title :</label>
            <input className="p-3 rounded-lg outline-none" type="text" placeholder="Add title here..." />
          </div>
          <div className={labelWrapper}>
            <label className={labelStyle}>Description : </label>
            <textarea className="rounded-lg p-3 outline-none" cols="30" rows="10" placeholder="Add description here..."></textarea>
          </div>
        </form>
        <button className={submitBtn}>Submit</button>
      </div>
    </>
  );
};

export default createForm;
