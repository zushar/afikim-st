import React from 'react';
import StageModule from './StageModule';

export default function StageSelecton({ modules, onDragStart }) {
  return (
    <div className='bg-blue-800 p-2 m-1 overflow-auto h-full'>
      {modules.map(module => (
        <StageModule key={module.id} module={module} onDragStart={onDragStart} />
      ))}
    </div>
  );
}
