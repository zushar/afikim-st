import React from 'react';
import { getTrianglePoints, styleForRotationButton } from '../utils/helper';

const Shape = ({ shape, handleMouseDown, handleRotateElement }) => {
  const { id, type, moduleData, x, y, rotation } = shape;

  return (
    <div style={{ position: 'absolute', left: `${x}px`, top: `${y}px`, transform: `rotate(${rotation}deg)` }}>
      <svg
        key={id}
        width={moduleData.width}
        height={moduleData.length}
        viewBox={`0 0 ${moduleData.width} ${moduleData.length}`}
        xmlns="http://www.w3.org/2000/svg"
        onMouseDown={(e) => handleMouseDown(e, id)}
        style={{
          cursor: 'grab',
        }}
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
        style={styleForRotationButton(type, moduleData.width / 2, moduleData.length / 2)}
      >
        ↻
      </button>
    </div>
  );
};

export default Shape;
