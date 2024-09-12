import React from 'react';

interface HeaderProps {
      viewTypeList: boolean;
      setViewTypeList: (viewTypeList: boolean) => void;
      openDocument: () => void;
      setFilter: (filter: any) => void;
}

export default function Header({ viewTypeList, setViewTypeList, openDocument, setFilter }: HeaderProps) {
      return (
            <div className='d-flex justify-content-end w-auto'>
                  {/* Campo de busca por título */}
                  <div className='me-3 d-flex align-items-center'>
                        <input
                              type='text'
                              className='form-control border-primary'
                              style={{ textOverflow: 'ellipsis' }}
                              placeholder='Pesquisar título'
                              onChange={(e) => setFilter({ title: e.target.value })}
                        />
                        <i className='bi bi-search ms-n4'></i>
                  </div>

                  {/* Botões de alternância de visualização (Lista ou Grid) */}
                  <div className='me-2 d-flex'>
                        <button
                              type='button'
                              onClick={() => setViewTypeList(true)}
                              className={`btn ${viewTypeList ? 'btn-primary' : 'btn-gray'} me-2`}
                        >
                              <i className='bi bi-list'></i>
                        </button>
                        <button
                              type='button'
                              onClick={() => setViewTypeList(false)}
                              className={`btn ${!viewTypeList ? 'btn-primary' : 'btn-gray'} me-2`}
                        >
                              <i className='bi bi-grid'></i>
                        </button>
                  </div>

                  {/* Botão para criar novo documento */}
                  <div>
                        <button type='button' onClick={() => openDocument()} className='btn btn-primary d-block d-lg-none'>
                              <i className='bi bi-plus'></i>
                        </button>
                        <button type='button' onClick={() => openDocument()}  className='btn btn-primary d-none d-lg-block'>
                              Novo documento
                        </button>
                  </div>
            </div>
      );
}
