import React from 'react';

type Props = {
      children: React.ReactNode;
      id: string;
      staticModal?: string | boolean;
      keyboard?: boolean;
};

export default function ModalContainer({ children, id, staticModal = true, keyboard = true }: Props) {
      return (
            <div
                  className='modal fade'
                  id={id}
                  aria-labelledby={`id_label`}
                  aria-hidden='true'
                  data-bs-backdrop={staticModal}
                  data-bs-keyboard={keyboard}
            >
                  {children}
            </div>
      );
}
