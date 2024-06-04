import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import Header from './layout/Header';
import ContentMain from './layout/ContentMain';
import Foot from './layout/Foot';

function App() {
  ;
  return (
    <div className='h-screen w-screen overflow-hidden flex flex-col justify-between'>
      <Header />
      <ContentMain />
      <Foot />
    </div>
  );
}

export default App;