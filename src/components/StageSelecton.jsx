import React, {useContext} from 'react';
import StageModule from './StageModule';
import { AppContext } from '../context/AppContext';

const StageSelecton = () => {
  const { modules } = useContext(AppContext);
  return (
    <div className="bg-blue-800 overflow-y-scroll h-full flex flex-col">
      {modules.map(module => (
        <div key={module.id} className="p-2 ">
          <StageModule module={module} />
        </div>
      ))}
    </div>
  );
};

export default StageSelecton