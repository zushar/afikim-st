import React from 'react';

const Shape = ({ shape, handleMouseDown, handleRotateElement }) => {
  const { id, type, moduleData, x, y, rotation } = shape;

  const getTrianglePoints = (type, width, length) => {
    switch (type) {
      case 'triangle':
        return `M0,${length} L${width},${length} L${width},0 Z`;
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

  return (
    <div
      key={id}
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        cursor: 'grab',
        transform: `rotate(${rotation}deg)`,
      }}
      onMouseDown={(e) => handleMouseDown(e, id)}
    >
      <svg
        width={moduleData.width}
        height={moduleData.length}
        viewBox={`0 0 ${moduleData.width} ${moduleData.length}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {type.includes('triangle') ? (
          <path
            d={getTrianglePoints(type, moduleData.width, moduleData.length)}
            fill="transparent"
            stroke="black"
            strokeWidth="3"
          />
        ) : (
          <rect
            width={moduleData.width}
            height={moduleData.length}
            fill="transparent"
            stroke="black"
            strokeWidth="3"
          />
        )}
      </svg>
      <button
        onClick={() => handleRotateElement(id)}
        style={{
          position: 'relative',
          top: '-20px',
          right: '-4px',
          cursor: 'pointer',
          color: 'black',
          width: '0px',
          height: '0px',
          zIndex: 1,
          fontSize: '13px',
        }}
      >
        ↻
      </button>
    </div>
  );
};

export default Shape;
