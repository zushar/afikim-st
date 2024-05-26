import React from 'react';

export default function StageModule({ module, onDragStart }) {
  return (
    <div
      draggable='true'
      onDragStart={(e) => onDragStart(e, module)}
      className='text-center m-1 border rounded cursor-pointer p-2'
    >
      {module.type} - {module.dimensions}
    </div>
  );
}