import React, { useState } from 'react';

interface OrderFilterProps {
      setFilter: (filter: any) => void;
      field: string;
      title: string;
}

export default function OrderFilter({ setFilter, field, title }: OrderFilterProps) {
      const [ascOrder, setAscOrder] = useState(true);

      // Função para alternar a ordenação
      const handleOrder = () => {
            setFilter({ sortField: field, sortOrder: ascOrder ? 'asc' : 'desc' });
            setAscOrder(!ascOrder);
      };

      return (
            <th>
                  {/* Título com opção de dropdown */}
                  <span data-bs-toggle='dropdown' className='dropdown-toggle' data-bs-auto-close='outside'>
                        {title}
                  </span>
                  <div className='dropdown-menu px-2'>
                        <div className='row'>
                              {/* Controle de ordenação */}
                              <span>
                                    Ordem:{' '}
                                    <button
                                          type='button'
                                          className={`btn btn-primary text-white ${ascOrder ? 'btn-gray' : ''}`}
                                          onClick={handleOrder}
                                    >
                                          <i className='bi bi-sort-alpha-down'></i>
                                    </button>
                                    <button
                                          type='button'
                                          className={`btn btn-primary text-white ${!ascOrder ? 'btn-gray' : ''}`}
                                          onClick={handleOrder}
                                    >
                                          <i className='bi bi-sort-alpha-up'></i>
                                    </button>
                              </span>
                        </div>
                  </div>
            </th>
      );
}
