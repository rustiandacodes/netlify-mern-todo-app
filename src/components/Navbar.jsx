import React from 'react';

const Navbar = () => {
  return (
    <>
      <div className="shadow-lg fixed w-full md:px-0 px-10 bg-slate-50 z-10">
        <div className="mx-auto container py-10">
          <span className="text-teal-500 font-bold text-2xl">Netlify Todo</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
