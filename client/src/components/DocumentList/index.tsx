import React from 'react';

import { Document } from '../../definitions/types/Document';
import { iconType } from '../DocumentCard/components/iconType';

export default function DocumentList({
      document,
      onEdit,
      onDelete,
}: {
      document: Document;
      onEdit: (document: Document) => void;
      onDelete: (document: Document) => void;
}) {
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
            <tr>
                  <td className='d-flex align-items-center'>
                        <i className={`${iconType[document.fileType] || iconType['default']} w-auto me-2 fs-4`}></i>
                        <p
                              className='w-auto fw-semibold m-0 p-0 overflow-hidden text-nowrap'
                              style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                        >
                              <a
                                    className='text-decoration-none'
                                    href={`http://localhost:3001/api/documents/view/${document.id}`}
                                    target='_blank'
                              >
                                    {document.title}
                              </a>
                        </p>
                  </td>
                  <td className='overflow-hidden text-nowrap' style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {document.fileName}
                  </td>
                  <td className='overflow-hidden text-nowrap' style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {document.description}
                  </td>
                  <td  className='overflow-hidden text-nowrap' style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{formatTime(document.createdAt)}</td>
                  <td className='text-center'>
                        <div className='dropdown'>
                              <i className='bi-three-dots-vertical' data-bs-toggle='dropdown' role='button'></i>
                              <ul className='dropdown-menu'>
                                    <li>
                                          <a
                                                className='dropdown-item'
                                                href={`http://localhost:3001/api/documents/download/${document.id}`}
                                          >
                                                <i className='bi bi-download me-2'></i> Baixar documento
                                          </a>
                                    </li>
                                    <li>
                                          <a className='dropdown-item' onClick={() => onEdit(document)}>
                                                <i className='bi bi-pencil me-2'></i> Editar documento
                                          </a>
                                    </li>
                                    <li>
                                          <a className='dropdown-item' onClick={() => onDelete(document)}>
                                                <i className='bi bi-trash me-2'></i> Deletar documento
                                          </a>
                                    </li>
                              </ul>
                        </div>
                  </td>
            </tr>
      );
}
