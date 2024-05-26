import React, { useRef, useState, useEffect } from 'react';

export default function Workspace({ onDragOver }) {
  const workspaceRef = useRef(null);
  const [elements, setElements] = useState([]);
  const [draggingElement, setDraggingElement] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

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
      y,
      rotation: 0, // Initial rotation angle
    };

    setElements((prevElements) => [...prevElements, newElement]);
  };

  const handleMouseDown = (e, id) => {
    const element = elements.find(el => el.id === id);
    if (element) {
      setDraggingElement(id);
      const rect = workspaceRef.current.getBoundingClientRect();
      setOffset({
        x: e.clientX - rect.left - element.x,
        y: e.clientY - rect.top - element.y,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (draggingElement !== null) {
      const rect = workspaceRef.current.getBoundingClientRect();
      let x = e.clientX - rect.left - offset.x;
      let y = e.clientY - rect.top - offset.y;

      // Constrain the position within the workspace boundaries
      x = Math.max(0, Math.min(x, rect.width - elements.find(el => el.id === draggingElement).moduleData.width));
      y = Math.max(0, Math.min(y, rect.height - elements.find(el => el.id === draggingElement).moduleData.length));

      setElements((prevElements) =>
        prevElements.map((el) =>
          el.id === draggingElement ? { ...el, x, y } : el
        )
      );
    }
  };

  const handleMouseUp = (e) => {
    const trashRect = document.getElementById('trash').getBoundingClientRect();
    const elementRect = e.target.getBoundingClientRect();

    if (
      elementRect.left < trashRect.right &&
      elementRect.right > trashRect.left &&
      elementRect.top < trashRect.bottom &&
      elementRect.bottom > trashRect.top
    ) {
      setElements((prevElements) => prevElements.filter(el => el.id !== draggingElement));
    }

    setDraggingElement(null);
  };

  const handleRotateElement = (id) => {
    setElements((prevElements) =>
      prevElements.map((el) =>
        el.id === id ? { ...el, rotation: (el.rotation + 90) % 360 } : el
      )
    );
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingElement]);

  return (
    <div
      className="bg-white m-1 w-full h-full p-4 border relative"
      ref={workspaceRef}
      onDrop={handleDrop}
      onDragOver={(e) => { e.preventDefault(); onDragOver(e); }}
    >
      {elements.map((el) => (
        <div
          key={el.id}
          style={{
            position: 'absolute',
            left: `${el.x}px`,
            top: `${el.y}px`,
            cursor: 'grab',
            transform: `rotate(${el.rotation}deg)`,
          }}
          onMouseDown={(e) => handleMouseDown(e, el.id)}
        >
          <svg
            width={el.moduleData.width}
            height={el.moduleData.length}
            viewBox={`0 0 ${el.moduleData.width} ${el.moduleData.length}`}
            xmlns="http://www.w3.org/2000/svg"
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
          <button
            onClick={() => handleRotateElement(el.id)}
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              cursor: 'pointer',
              background: 'blue',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              zIndex: 1,
            }}
          >
            ↻
          </button>
        </div>
      ))}
      <div
        id="trash"
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          width: '50px',
          height: '50px',
          backgroundColor: 'red',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          cursor: 'pointer',
        }}
      >
        🗑️
      </div>
    </div>
  );
}

const getTrianglePoints = (type, width, length) => {
  switch (type) {
    case 'triangle':
      return `M0,${length} L${width},0 L${width},${length} Z`;
    case 'triangle lift':
      return `M0,${length} L${width},${length} L${width},0 Z`;
    case 'rounded triangle':
      return `M0,${length} L${width},${length} L${width},0 Q0,0 0,${length} Z`;
    case 'triangle right':
      return `M0,0 L${width},${length} L0,${length} Z`;
    default:
      return '';
  }
};
