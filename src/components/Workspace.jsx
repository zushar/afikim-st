import React, { useRef, useState, useEffect, useContext } from 'react';
import Shape from './Shape';
import Foot from '../layout/Foot';  // Make sure this path is correct
import { AppContext } from '../context/AppContext';

export default function Workspace() {
  const { handleDragOver, elements, setElements, setWorkspaceRef, setSelectedElement } = useContext(AppContext);
  const workspaceRef = useRef(null);
  const [draggingElement, setDraggingElement] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  // const [inputTop, setInputTop] = useState("");

  const SNAP_DISTANCE = 10; // Distance in pixels to snap elements

  const snapToGrid = (x, y, currentElement) => {
    // Snap to other elements
    elements.forEach(el => {
      if (el.id !== currentElement.id) {
        // Snap to the left or right
        if (Math.abs(el.x - (x + currentElement.moduleData.width)) < SNAP_DISTANCE) x = el.x - currentElement.moduleData.width;
        if (Math.abs((el.x + el.moduleData.width) - x) < SNAP_DISTANCE) x = el.x + el.moduleData.width;

        // Snap to the top or bottom
        if (Math.abs(el.y - (y + currentElement.moduleData.length)) < SNAP_DISTANCE) y = el.y - currentElement.moduleData.length;
        if (Math.abs((el.y + el.moduleData.length) - y) < SNAP_DISTANCE) y = el.y + el.moduleData.length;
      }
    });

    return { x, y };
  };

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

    // Snap to grid
    const { x: snappedX, y: snappedY } = snapToGrid(x, y, newElement);

    newElement.x = snappedX;
    newElement.y = snappedY;

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
      const element = elements.find(el => el.id === draggingElement);
      const rect = workspaceRef.current.getBoundingClientRect();
      let x = e.clientX - rect.left - offset.x;
      let y = e.clientY - rect.top - offset.y;

      // Snap to grid
      const { x: snappedX, y: snappedY } = snapToGrid(x, y, element);

      setElements((prevElements) =>
        prevElements.map((el) =>
          el.id === draggingElement ? { ...el, x: snappedX, y: snappedY } : el
        )
      );

      setDraggingElement(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingElement]);

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
