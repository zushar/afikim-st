import React, { useContext, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import { getTrianglePoints } from '../utils/helper';

const StageModule = ({ module }) => {

  const dragImageRef = useRef(null);
  const { handleDragStartModule, setColor, setSelectedElement, setHeight } = useContext(AppContext);
  const { type, dimensions, width, length } = module;

  const handleDragStartStage = (e) => {
    e.dataTransfer.setDragImage(dragImageRef.current, width / 2, length / 2);
    handleDragStartModule(e, module);
  };
  

  return (
    <div
      draggable="true"
      onDragStart={handleDragStartStage}
      className="text-center cursor-pointer inline-block"
      onMouseDown={() => {
        setSelectedElement(null);
        setColor(null);
        setHeight(null);
        }
      }
    >
      <svg
        width={width}
        height={length}
        viewBox={`0 0 ${width} ${length}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', margin: '0 auto' }}
        ref={dragImageRef}
      >
        {type.includes('משולש')  || type === ' חצי עיגול ' ? (
          <path
            d={getTrianglePoints(type, width, length)}
            fill="#f8286e"
          />
        ) : (
          <rect
            width={width}
            height={length}
            fill="#f8286e"
          />
        )}
      </svg>
      <h1 className="text-white">{type}</h1>
      <h1 className="text-white">{dimensions}</h1>
    </div>
  );
};

export default StageModule;
