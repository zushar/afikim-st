import React, { useState } from 'react';
import StageSelecton from '../components/StageSelecton';
import Workspace from '../components/Workspace';
import List from '../components/List';

export default function ContentMain() {
  const [modules] = useState([
    { id: '1', type: 'square', dimensions: '1m x 2m', width: 40, length: 80 },
    { id: '2', type: 'square', dimensions: '0.5m x 2m', width: 20, length: 80 },
    { id: '3', type: 'square', dimensions: '0.5m x 1m', width: 20, length: 40 },
    { id: '5', type: 'square', dimensions: '1m x 1m', width: 40, length: 40 },
    { id: '7', type: 'rounded triangle', dimensions: '1m x 1m', width: 40, length: 40 },
    { id: '8', type: 'triangle', dimensions: '1m x 1m', width: 40, length: 40 },
    { id: '10', type: 'triangle lift', dimensions: '1m x 2m', width: 40, length: 80 },
    { id: '10', type: 'triangle right', dimensions: '1m x 2m', width: 40, length: 80 }
  ]);

  const handleDragStart = (e, module) => {
    e.dataTransfer.setData("type", module.type);
    e.dataTransfer.setData("moduleData", JSON.stringify({ width: module.width, length: module.length }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className='m-1 flex justify-between h-full'>
      <StageSelecton modules={modules} onDragStart={handleDragStart} />
      <Workspace onDragOver={handleDragOver} />
      <List />
    </div>
  );
}
