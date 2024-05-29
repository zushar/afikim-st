import React, {useContext} from 'react';
import StageModule from './StageModule';
import { AppContext } from '../context/AppContext';

const StageSelecton = () => {
  const { modules } = useContext(AppContext);
  return (
    <div className="bg-blue-800 p-2 m-1 overflow-y-scroll h-full flex flex-col">
      {modules.map(module => (
        <div key={module.id} className="p-2 w-1/2 ">
          <StageModule module={module} />
        </div>
      ))}
    </div>
  );
};

export default StageSelecton