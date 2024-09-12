import * as React from 'react';
import { superstate } from '@superstate/core';
import { useSuperState } from '@superstate/react';
import { createPortal } from 'react-dom';

// componente responsável por renderizar notificações

export const notifications = superstate<INotification[]>([]).extend({
      notify({ set }, message: string, type: 'error' | 'success') {
            const id = Math.random().toString();

            set((prev) => [...prev, { id, message, type }]);

            setTimeout(() => notifications.destroy(id), 6000); // controla o tempo de duração da notificação
      },
      destroy({ set }, id: string) {
            set((prev) => prev.filter((p) => p.id !== id));
      },
});

export default function NotificationsRenderer() {
      useSuperState(notifications);
      if (!notifications.now().length) {
            return null;
      }
      return createPortal(
            <div
                  className='d-flex col-12 flex-column p-5 align-items-end side-alert position-fixed'
                  style={{ bottom: 0 }}
            >
                  {notifications.now().map((n) => {
                        return (
                              <div
                                    className={`border border-1 rounded-2 col-lg-3 w-auto d-flex align-items-center justify-content-between gap-10 p-3 ${
                                          n.type === 'success'
                                                ? 'border-success bg-success-300'
                                                : 'border-danger bg-danger-300'
                                    }`}
                                    key={n.id}
                              >
                                    <p
                                          className={`fs-4 fw-semibold mb-0 ${
                                                n.type === 'success' ? 'text-success-600' : 'text-danger-600'
                                          }`}
                                    >
                                          <i className='bi bi-exclamation-diamond pe-2'></i>
                                          {n.message}
                                    </p>

                                    <button
                                          type='button'
                                          onClick={() => notifications.destroy(n.id)}
                                          className='btn btn-link'
                                    >
                                          <i
                                                className={`bi bi-x-lg fs-5 ${
                                                      n.type === 'success' ? 'text-success-600' : 'text-danger-600'
                                                }`}
                                          ></i>
                                    </button>
                              </div>
                        );
                  })}
            </div>,
            document.body
      );
}

interface INotification {
      id: string;
      message: string;
      type: string;
}
