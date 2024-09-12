import React, { Suspense, useMemo, FC } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { Pages } from '../pagesRounting/components/createPages';

type Props = { pages: Pages; initial: string };

export const RenderLayout: FC<Props> = ({ pages, initial }) => {
      return useMemo(() => {
            const entries = Object.entries(pages);

            return (
                  <Suspense fallback={<div className='app-container'> </div>}>
                        <Routes>
                              {entries.map(([path, content]) => {
                                    if (Array.isArray(content)) throw new Error('Page content not processed');

                                    return (
                                          <Route
                                                key={path}
                                                path={path}
                                                element={
                                                      <content.layout>
                                                            <content.content />
                                                      </content.layout>
                                                }
                                          />
                                    );
                              })}
                              <Route path='*' element={<Navigate to={initial} replace />} />
                        </Routes>
                  </Suspense>
            );
      }, [initial, pages]);
};
