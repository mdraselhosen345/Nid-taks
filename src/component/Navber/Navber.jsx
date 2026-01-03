import React from 'react';

const Navber = () => {
    return (
        <div className="navbar bg-[#004700] shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost bg-[#0000FF] text-xl text-[#C0C0C0]">Data</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1 text-[#FFFFFF]">
      <li><a>Link 1</a></li>
      <li><a>Link 2</a></li>
    </ul>
  </div>
</div>
    );
};

export default Navber;