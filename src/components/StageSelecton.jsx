import React from 'react';
import StageModule from './StageModule';

const StageSelecton = ({ modules, onDragStart }) => {
  return (
    <div className="bg-blue-800 p-2 m-1 overflow-y-scroll h-full flex flex-col">
      {modules.map(module => (
        <div key={module.id} className="p-2 w-1/2 ">
          <StageModule module={module} onDragStart={onDragStart} />
        </div>
      ))}
    </div>
  );
};

export default StageSelecton