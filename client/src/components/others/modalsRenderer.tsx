import { useGlobalObservable, useSubscriber } from 'open-observable';
import React, { FC, Fragment } from 'react';
import { modalsArray } from './useModal';



export default function ModalsRenderer() {
      const [modals, setModals] = React.useState<any[]>([]);
      const $value = useGlobalObservable(modalsArray);
      const value = useSubscriber($value);

      React.useEffect(() => {
            if (!value) return;
            setModals(value);
      }, [value]);

      return (
            <div>
                  {modals.map((modal: any, index: any) => {
                        return <Fragment key={modal.id}>{modal.content}</Fragment>;
                  })}
            </div>
      );
}
