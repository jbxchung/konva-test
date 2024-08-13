
import { FC } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import KonvaWrapper from './components/KonvaWrapper/KonvaWrapper';

import './App.scss';

const App: FC = () => {
  return (
    <div className="page-wrapper">
      <Toolbar />
      <KonvaWrapper />
    </div>
  );
};
  
export default App;