import React, { useContext, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import { getTrianglePoints } from '../utils/helper';

const StageModule = ({ module }) => {

  const dragImageRef = useRef(null);
  const { handleDragStartModule } = useContext(AppContext);
  const { type, width, length } = module;

  const handleDragStartStage = (e) => {
    e.dataTransfer.setDragImage(dragImageRef.current, width / 2, length / 2);
    handleDragStartModule(e, module);
  };
  

  return (
    <div
      draggable="true"
      onDragStart={handleDragStartStage}
      className="text-center m-1 cursor-pointer p-2 inline-block"
    >
      <svg
        width={width}
        height={length}
        viewBox={`0 0 ${width} ${length}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', margin: '0 auto' }}
        ref={dragImageRef}
      >
        {type.includes('triangle') ? (
          <path
            d={getTrianglePoints(type, width, length)}
            fill="red"
          />
        ) : (
          <rect
            width={width}
            height={length}
            fill="red"
          />
        )}
      </svg>
    </div>
  );
};

export default StageModule;
