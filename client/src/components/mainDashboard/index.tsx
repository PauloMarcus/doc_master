import React, { FC, ReactNode, PropsWithChildren } from 'react';
import NavBar from '../TopBar';

const MainDashboard: FC<PropsWithChildren<{}>> = ({ children }) => {
      return (
            <div className='app-container'>
                  <NavBar>{children}</NavBar>
            </div>
      );
};

export default MainDashboard;
