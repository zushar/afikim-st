import React, { useRef, useState, useEffect, useContext } from 'react';
import Shape from './Shape';
import Foot from '../layout/Foot';  // Make sure this path is correct
import { AppContext } from '../context/AppContext';

export default function Workspace() {
  const { handleDragOver, elements, setElements, setWorkspaceRef, setSelectedElement, selectedElement } = useContext(AppContext);
  const workspaceRef = useRef(null);
  const [draggingElement, setDraggingElement] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    const moduleData = JSON.parse(e.dataTransfer.getData("moduleData"));

    const rect = workspaceRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left - (moduleData.width || moduleData.radius * 2) / 2;
    let y = e.clientY - rect.top - (moduleData.length || moduleData.radius * 2) / 2;

    const newElement = {
      id: Date.now(),
      type,
      moduleData,
      x,
      y,
      rotation: 0, // Initial rotation angle
    };

    setElements((prevElements) => [...prevElements, newElement]);
    setSelectedElement(newElement.id);
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
    if (draggingElement !== null) {
      const rect = workspaceRef.current.getBoundingClientRect();
      let x = e.clientX - rect.left - offset.x;
      let y = e.clientY - rect.top - offset.y;

      setElements((prevElements) =>
        prevElements.map((el) =>
          el.id === draggingElement ? { ...el, x: x, y: y} : el
        )
      );

      setDraggingElement(null);
    }
  };

  const handleKeyDown = (e) => {
    if (selectedElement !== null) {
      setElements((prevElements) =>
        prevElements.map((el) => {
          if (el.id === selectedElement) {
            let newX = el.x;
            let newY = el.y;

            switch (e.key) {
              case 'ArrowUp':
                newY = Math.max(0, el.y - 1);
                break;
              case 'ArrowDown':
                newY = Math.min(workspaceRef.current.clientHeight - el.moduleData.length, el.y + 1);
                break;
              case 'ArrowLeft':
                newX = Math.max(0, el.x - 1);
                break;
              case 'ArrowRight':
                newX = Math.min(workspaceRef.current.clientWidth - el.moduleData.width, el.x + 1);
                break;
              default:
                break;
            }

            return { ...el, x: newX, y: newY };
          }
          return el;
        })
      );
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [draggingElement, selectedElement]);

  useEffect(() => {
    setWorkspaceRef(workspaceRef);
  }, [setWorkspaceRef]);

  return (
    <div
      className="workspace bg-white w-full h-full border relative"
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
