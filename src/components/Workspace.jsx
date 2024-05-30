import React, { useRef, useState, useEffect, useContext } from 'react';
import Shape from './Shape';
import { AppContext } from '../context/AppContext';

export default function Workspace() {
  const { handleDragOver, elements, setElements, } = useContext(AppContext);
  const workspaceRef = useRef(null);
  const [draggingElement, setDraggingElement] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    const moduleData = JSON.parse(e.dataTransfer.getData("moduleData"));

    const rect = workspaceRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - (moduleData.width || moduleData.radius * 2) / 2;
    const y = e.clientY - rect.top - (moduleData.length || moduleData.radius * 2) / 2;

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
    setDraggingElement(null);
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
      className="workspace bg-white m-1 w-full h-full p-4 border relative"
      ref={workspaceRef}
      onDrop={handleDrop}
      onDragOver={(e) => { e.preventDefault(); handleDragOver(e); }}
    >
      {elements.map((el) => (
        <Shape
          key={el.id}
          shape={el}
          handleMouseDown={handleMouseDown}
        />
      ))}
    </div>
  );
}