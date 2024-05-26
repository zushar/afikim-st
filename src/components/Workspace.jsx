import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';

export default function Workspace({ onDragOver }) {
  const workspaceRef = useRef(null);
  const [elements, setElements] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    const moduleData = JSON.parse(e.dataTransfer.getData("moduleData"));

    const rect = workspaceRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - moduleData.width / 2;
    const y = e.clientY - rect.top - moduleData.length / 2;

    const newElement = {
      id: Date.now(),
      type,
      moduleData,
      x,
      y
    };

    setElements((prevElements) => [...prevElements, newElement]);
  };

  const handleDragStartElement = (e, id) => {
    e.dataTransfer.setData("id", id);
  };

  const handleDropElement = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    const rect = workspaceRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setElements((prevElements) =>
      prevElements.map((el) =>
        el.id === parseInt(id) ? { ...el, x: x - el.moduleData.width / 2, y: y - el.moduleData.length / 2 } : el
      )
    );
  };

  return (
    <div
      className="bg-white m-1 w-full h-full p-4 border relative"
      ref={workspaceRef}
      onDrop={(e) => { handleDrop(e); handleDropElement(e); }}
      onDragOver={onDragOver}
    >
      {elements.map((el) => (
        <svg
          key={el.id}
          width={el.moduleData.width}
          height={el.moduleData.length}
          viewBox={`0 0 ${el.moduleData.width} ${el.moduleData.length}`}
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', left: `${el.x}px`, top: `${el.y}px` }}
          draggable
          onDragStart={(e) => handleDragStartElement(e, el.id)}
        >
          {el.type.includes('triangle') ? (
            <path
              d={getTrianglePoints(el.type, el.moduleData.width, el.moduleData.length)}
              fill="red"
              stroke="black"
              strokeWidth="2"
            />
          ) : (
            <rect
              width={el.moduleData.width}
              height={el.moduleData.length}
              fill="red"
              stroke="black"
              strokeWidth="2"
            />
          )}
        </svg>
      ))}
    </div>
  );
}

const getTrianglePoints = (type, width, length) => {
  switch (type) {
    case 'triangle1m':
      return `M0,${length} L${width},0 L${width},${length} Z`;
    case 'triangle2m':
      return `M0,${length} L${width},${length} L${width},0 Z`;
    case 'rounded triangle':
      return `M0,${length} L${width},${length} L${width},0 Q0,0 0,${length} Z`;
    default:
      return '';
  }
};
