import React, { useRef } from 'react';

const getTrianglePoints = (type, width, length) => {
  switch (type) {
    case 'triangle':
      return `M0,${length} L${width},0 L${width},${length} Z`;
      case 'rounded triangle':
        return `M0,${length} L${width},${length} L${width},0 Q0,0 0,${length} Z`;
    case 'triangle lift':
      return `M0,${length} L${width},${length} L${width},0 Z`;
    case 'triangle right':
      return `M0,0 L${width},${length} L0,${length} Z`;
    default:
      return '';
  }
};


const StageModule = ({ module, onDragStart }) => {
  const { type, dimensions, width, length } = module;
  const dragImageRef = useRef(null);

  const handleDragStart = (e) => {
    e.dataTransfer.setDragImage(dragImageRef.current, width / 2, length / 2);
    onDragStart(e, module);
  };

  return (
    <div
      draggable="true"
      onDragStart={handleDragStart}
      className="text-center m-1 border rounded cursor-pointer p-2 inline-block"
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
      <div className="bg-pink-600 m-1 p1 inline-block">{dimensions}</div>
    </div>
  );
};

export default StageModule;
