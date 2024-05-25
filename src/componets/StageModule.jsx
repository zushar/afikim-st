import React from 'react'

export default function StageModule({ type, dimensions, onDragStart }) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, type)}
      className="stage-module"
    >
      {type} - {dimensions}
    </div>
  )
}
