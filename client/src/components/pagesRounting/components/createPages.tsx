import { FC, PropsWithChildren } from 'react';


type PageUnprocessed = [FC] | [FC ];
export type PageProcessed = { layout: FC<PropsWithChildren<{}>>; content: FC };

type PageContent = PageUnprocessed | PageProcessed;

export type Pages = Record<string, PageContent>;

function processContent(content: PageUnprocessed, layout: FC): PageProcessed {
      return { content: content[0], layout };
}

export const createPages = <T extends Pages>(layout: FC, routes: T): T => {
      const temp = {} as any;

      for (let key in routes) temp[key] = processContent(routes[key] as any, layout);

      return temp as T;
};

export const mergePages = <A extends Pages>(
      routesA: A,
  
    
): A  => {
      return { ...routesA};
};
