import React, { FC } from 'react';
import { formatRouteBuild } from './components/others/format-rout-build';
import { pages } from './components/pagesRounting';
import { RenderLayout } from './components/RenderLayout';
import ModalsRenderer from './components/others/modalsRenderer';
import NotificationsRenderer from './components/NotificationsRenderer';

type Routes = keyof typeof pages;

export const route = formatRouteBuild<Routes>();

export const App: FC = () => {
      return (
            <>
                  <NotificationsRenderer />
                  <RenderLayout pages={pages} initial={route('/home')} />
                  <ModalsRenderer />
            </>
      );
};
