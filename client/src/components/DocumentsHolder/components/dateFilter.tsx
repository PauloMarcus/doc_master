import React, { useState } from 'react';

interface DateFilterProps {
      setFilter: (filter: any) => void;
}

export default function DateFilter({ setFilter }: DateFilterProps) {
      const [initialDate, setInitialDate] = useState('');
      const [finalDate, setFinalDate] = useState('');
      const [ascOrder, setAscOrder] = useState(true);

      // Função para lidar com a filtragem de datas
      const handleDateFilter = () => {
            setFilter({ startDate: initialDate, endDate: finalDate });
      };

      // Função para alternar a ordenação (ascendente ou descendente)
      const handleOrder = () => {
            setFilter({ sortField: 'createdAt', sortOrder: ascOrder ? 'asc' : 'desc' });
            setAscOrder(!ascOrder);
      };

      // Função para limpar os filtros
      const clearFilter = () => {
            setFilter({});
            setInitialDate('');
            setFinalDate('');
      };

      return (
            <th>
                  <span data-bs-toggle='dropdown' className='dropdown-toggle' data-bs-auto-close='outside'>
                        Criado em
                  </span>
                  <div className='dropdown-menu px-2'>
                        <div className='row'>
                              {/* Campo de data inicial */}
                              <div className='col'>
                                    <div className='form-label'>
                                          <label htmlFor='initial-date'>Data inicial</label>
                                          <input
                                                type='date'
                                                value={initialDate}
                                                onChange={(e) => setInitialDate(e.target.value)}
                                                className='form-control'
                                                id='initial-date'
                                          />
                                    </div>
                              </div>

                              {/* Campo de data final */}
                              <div className='col'>
                                    <div className='form-label'>
                                          <label htmlFor='final-date'>Data final</label>
                                          <input
                                                type='date'
                                                value={finalDate}
                                                onChange={(e) => setFinalDate(e.target.value)}
                                                className='form-control'
                                                id='final-date'
                                          />
                                    </div>
                              </div>

                              {/* Botões de filtro e limpar */}
                              <div className='col d-flex flex-column'>
                                    <button
                                          type='button'
                                          onClick={handleDateFilter}
                                          className='btn btn-primary text-white mb-2'
                                    >
                                          <i className='bi bi-funnel'></i> Filtrar
                                    </button>
                                    <button type='button' onClick={clearFilter} className='btn btn-primary text-white'>
                                          Limpar
                                    </button>
                              </div>
                        </div>

                        {/* Controle de ordenação */}
                        <div className='row mt-2'>
                              <span>
                                    Ordem:{' '}
                                    <button
                                          type='button'
                                          className={`btn btn-primary ${ascOrder ? 'btn-gray' : ''}`}
                                          onClick={handleOrder}
                                    >
                                          <i className='bi bi-sort-alpha-down'></i>
                                    </button>
                                    <button
                                          type='button'
                                          className={`btn btn-primary ${!ascOrder ? 'btn-gray' : ''}`}
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
