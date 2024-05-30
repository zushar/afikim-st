import React, { useContext } from 'react';
import { getTrianglePoints } from '../utils/helper';
import { AppContext } from '../context/AppContext';

const Shape = ({ shape, handleMouseDown }) => {
  const { id, type, moduleData, x, y, rotation, stroke, fill } = shape;
  const { setSelectedElement, setElements, color, setLegs, height } = useContext(AppContext);

  const handleClick = () => {
    setSelectedElement(id);

    if (color || height) {
      setElements((prevElements) =>
        prevElements.map((el) =>
          el.id === id ? { ...el, stroke: color } : el
        )
      );

      setLegs((prevLegs) => {
        const leg = prevLegs.find((leg) => leg.key === id);
        if (leg) {
          return prevLegs.map((leg) =>
            leg.key === id ? { ...leg, color: color, hight: height } : leg
          );
        }
        return [...prevLegs, { key: id, color: color, hight: height }];
      });
    }
  };

  return (
    <div
      key={id}
      style={{ position: 'absolute', left: `${x}px`, top: `${y}px`, transform: `rotate(${rotation}deg)` }}
      onClick={handleClick}
    >
      <svg
        width={moduleData.width}
        height={moduleData.length}
        viewBox={`0 0 ${moduleData.width} ${moduleData.length}`}
        xmlns="http://www.w3.org/2000/svg"
        onMouseDown={(e) => handleMouseDown(e, id)}
        style={{
          cursor: 'grab',
        }}
      >
        {type.includes('משולש') || type === 'חצי עיגול' ? (
          <path
            d={getTrianglePoints(type, moduleData.width, moduleData.length)}
            fill={fill || "transparent"}
            stroke={stroke || 'black'}
            strokeWidth="8"
          />
        ) : (
          <rect
            width={moduleData.width}
            height={moduleData.length}
            fill={fill || "transparent"}
            stroke={stroke || 'black'}
            strokeWidth="8"
          />
        )}
      </svg>
    </div>
  );
};

export default Shape;
