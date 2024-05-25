import React, { useState, useRef } from 'react';

export default function Workspace({ onDragOver }) {
  const [items, setItems] = useState([]);
  const workspaceRef = useRef(null);
  const [zoom, setZoom] = useState(1);

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    setItems(prevItems => [...prevItems, { id: prevItems.length, type }]);
  };

  const zoomIn = () => {
    setZoom(zoom * 1.2);
  };

  const zoomOut = () => {
    setZoom(zoom / 1.2);
  };
  return (
    <div className="containerWorkspace">
      <div className="zoom-controls">
        <button onClick={zoomIn}>Zoom In</button>
        <button onClick={zoomOut}>Zoom Out</button>
      </div>
      <div
        className="workspace"
        ref={workspaceRef}
        style={{ transform: `scale(${zoom})` }}
        onDrop={handleDrop}
        onDragOver={onDragOver}
      >
        {items.length > 0 ? items.map(item => (
          <div
            key={item.id}
            className="workspace-item"
            style={{ top: `${10 + item.id * 50}px`, left: `${10 + item.id * 50}px` }}
          >
            {item.type}
          </div>
        )) : <div className="workspace-placeholder">Drop modules here</div>}
        <div className="stage"></div>
      </div>
    </div>
  )
}
