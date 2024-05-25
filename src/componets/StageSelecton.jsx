import React from 'react'

export default function StageSelecton({ modules, onDragStart }) {

  return (
    <div className='stage-selection'>
      {modules.map(module => (
        <StageModule key={module.id} {...module} onDragStart={onDragStart} />
      ))}
    </div>
  )
}
