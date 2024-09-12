import React from 'react';
import { iconType } from './components/iconType';
import { Document } from '../../definitions/types/Document';

export default function DocumentCard({document, onEdit, onDelete} : {document: Document, onEdit: (document: Document) => void, onDelete: (document: Document) => void}) {
      function formatTime(timeString: string) {
            const time = new Date(timeString);
            const day = time.getDate();
            const month = time.getMonth() + 1;
            const year = time.getFullYear();
            const hours = time.getHours();
            const minutes = time.getMinutes();
            return `${day}/${month}/${year} ${hours}:${minutes}`;
      }

      return (
            <div className='col-12 col-md-6 col-lg-4 col-xl-3'>
                  <div className='row  bg-gray-100 rounded-4 m-1 p-2'>
                        <div className='col-12'>
                              <div className='row g-2 flex-nowrap align-items-center justify-content-between'>
                                    <div className='d-flex w-auto align-items-center justify-content-center'>
                                          <i className={`${iconType['pdf']} w-auto me-2 fs-4`}></i>
                                          <p
                                                className='w-auto fw-semibold m-0 p-0 overflow-hidden text-nowrap '
                                                style={{ textOverflow: 'ellipsis' }}
                                          >
                                                <a
                                                      className='text-decoration-none'
                                                      href={`http://localhost:3001/api/documents/view/${document.id}`}
                                                      target='_blank'
                                                >
                                                      {document.title}
                                                </a>
                                          </p>
                                    </div>
                                    <div className='w-auto cursor-pointer'>
                                          <i className='bi-three-dots-vertical w-auto'  data-bs-toggle='dropdown'  role="button"></i>
                                          <ul className='dropdown-menu'>
                                                <li>
                                                      <a className='dropdown-item'>
                                                            {' '}
                                                            <a
                                                                  className='text-decoration-none'
                                                                  href={`http://localhost:3001/api/documents/download/${document.id}`}
                                                            >
                                                                  {' '}
                                                                  <i className='bi bi-download me-2'></i>Baixar
                                                                  documento
                                                            </a>
                                                      </a>
                                                </li>
                                                <li>
                                                      <a className='dropdown-item'
                                                        onClick={() => onEdit(document)}
                                                      >
                                                            <i className='bi bi-pencil me-2'></i>Editar documento
                                                      </a>
                                                </li>
                                                <li>
                                                      <a className='dropdown-item'
                                                       onClick={() => onDelete(document)}
                                                      >
                                                            <i className='bi bi-trash me-2'></i>Deletar documento
                                                      </a>
                                                </li>
                                          </ul>
                                    </div>
                              </div>
                              <div className='row mt-2'>
                                    <div className='col-12'>
                                          <p
                                                className='m-0 p-0 fs-7 overflow-hidden text-nowrap '
                                                style={{ textOverflow: 'ellipsis' }}
                                          >
                                                Nome do arquivo: {document.fileName}
                                          </p>
                                    </div>
                                    <div className='col-12'>
                                          <p
                                                className='m-0 p-0 fs-7  overflow-hidden text-nowrap '
                                                style={{ textOverflow: 'ellipsis' }}
                                          >
                                                Descrição: {document.description}
                                          </p>
                                    </div>
                                    <div className='col-12'>
                                          <p className='m-0 p-0 fs-7'>Criado em: {formatTime(document.createdAt)}</p>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
}
