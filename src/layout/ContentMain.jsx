import React, { useState } from 'react';
import StageSelecton from '../componets/StageSelecton';
import Workspece from '../componets/Workspace';
import List from '../componets/List';

export default function ContentMain() {
  const [modules] = useState([
    { id: '1', type: 'square', dimensions: '1m x 2m' },
    { id: '2', type: 'square', dimensions: '0.5m x 2m' },
    { id: '3', type: 'square', dimensions: '0.5m x 1m' },
    { id: '4', type: 'square', dimensions: '0.3m x 1m' },
    { id: '5', type: 'square', dimensions: '1m x 1m' },
    { id: '6', type: 'square', dimensions: '1m x 1m' },
    { id: '7', type: 'triangle rounded', dimensions: '1m x 1m' },
    { id: '8', type: 'triangle', dimensions: '1m x 1m' },
    { id: '9', type: 'triangle', dimensions: '1m x 1m' },
    { id: '10', type: 'triangle lift', dimensions: '1m x 2m' },
    { id: '11', type: 'triangle right', dimensions: '1m x 2m' }
  ]);

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData("type", type);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <StageSelecton modules={modules} onDragStart={handleDragStart} />
      <Workspece onDragOver={handleDragOver} />
      <List />
    </div>
  )
}
