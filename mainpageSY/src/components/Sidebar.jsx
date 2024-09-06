// src/components/Sidebar.js
import React from 'react';
import './Sidebar.css'; // 개별 스타일 적용

function Sidebar() {
  return (

    <nav className="sidebar">
      <div className="icon home"><a href="#"></a></div>
      <div className="icon diary"><a href="#"></a></div>
      <div className="icon board"><a href="#"></a></div>
      <div className="icon visit"><a href="#"></a></div>
      <div className="icon walk"><a href="#"></a></div>
      <div className="icon food"><a href="#"></a></div>
    </nav>
 
  );
}

export default Sidebar;
