import React, {useContext} from 'react'
import { AppContext } from '../context/AppContext'

export default function List() {
  const { elements } = useContext(AppContext)
  return (
    <div className='bg-blue-800 m-1 h-full max-w-52'>
      {elements.map((el) => (
        <div key={el.id} className='p-2 w-1/2'>
          <div className='bg-white p-2 m-1'>
            <p className='text-center'>{el.type}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
