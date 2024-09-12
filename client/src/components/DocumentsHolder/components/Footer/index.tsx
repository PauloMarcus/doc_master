import { Listen, useSubscriberEffect } from 'open-observable';
import React from 'react';

export default function Footer({ source }: { source: any }) {
      const [currentPage, setCurrentPage] = React.useState(0);
      const [pagination, setPagination] = React.useState([]);
      const [totalPages, setTotalPages] = React.useState(1);

      const [isEmpty, setIsEmpty] = React.useState(true);

      useSubscriberEffect(source.items, (x) => {
            const totalPages = Math.ceil(source.total.current() / 20);
            const currentPage = source.pagination.current().page;
            setTotalPages(totalPages);
            setCurrentPage(currentPage);
            if (x != '') setIsEmpty(false);
      });

      React.useEffect(() => {
            const pages: Array<any> = [];

            if (isEmpty) {
                  pages.push(1);
                  setPagination(pages as never);
                  return;
            }

            if (totalPages == 1) {
                  pages.push(1);
            } else if (totalPages == 2) {
                  pages.push(1, 2);
            } else if (totalPages == 3) {
                  pages.push(1, 2, 3);
            } else if (totalPages == 4) {
                  pages.push(1, 2, 3, 4);
            } else if (currentPage == 1) {
                  pages.push(currentPage, currentPage + 1, '...', totalPages);
            } else if (currentPage == totalPages) {
                  pages.push(1, '...', currentPage - 1, currentPage);
            } else if (currentPage == 2) {
                  pages.push(1, currentPage, currentPage + 1, '...', totalPages);
            } else if (currentPage == totalPages - 1) {
                  pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1);
            } else {
                  pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
            setPagination(pages as never);
      }, [currentPage, isEmpty, source, totalPages]);

      return (
            <>
                  <div className='col-lg-12 d-flex justify-content-between mt-2'>
                        <div className='col-6'>
                              <p className='mb-0'>
                                    Registros:
                                    <span className='fw-bold'>
                                          {' '}
                                          <Listen subscriber={source.total}>{(x) => x as string}</Listen>
                                    </span>
                              </p>
                        </div>
                        <nav aria-label='Page navigation'>
                              <ul className='pagination'>
                                    <li className='page-item ' key={'lastpage'}>
                                          <button
                                                type='button'
                                                className={`page-link rounded-2 ${
                                                      currentPage == 1 || isEmpty ? 'disabled' : ''
                                                }`}
                                                aria-label='Pagina-anterior'
                                                onClick={() => source.setPage(source.pagination.current().page - 1)}
                                          >
                                                <span aria-hidden='true'>&laquo;</span>
                                          </button>
                                    </li>
                                    {pagination.map((item: any, index: number) => (
                                          <li
                                                key={index}
                                                className={`page-item border-white ${
                                                      item != '...' ? 'cursor-pointer' : 'cursor-default'
                                                }`}
                                                onClick={() => (item == '...' ? '' : !isEmpty && source.setPage(item))}
                                          >
                                                <span
                                                      className={`page-link   rounded-2  mx-1 ${
                                                            item == currentPage
                                                                  ? 'bg-primary text-white cursor-default'
                                                                  : ''
                                                      }`}
                                                >
                                                      {item}
                                                </span>
                                          </li>
                                    ))}
                                    <li className='page-item' key={'nextpage'}>
                                          <button
                                                type='button'
                                                className={`page-link rounded-2  ${
                                                      totalPages == currentPage ? 'disabled' : ''
                                                }`}
                                                aria-label='Proxima-pagina'
                                                onClick={() => source.setPage(source.pagination.current().page + 1)}
                                          >
                                                <span aria-hidden='true'>&raquo;</span>
                                          </button>
                                    </li>
                              </ul>
                        </nav>
                  </div>
            </>
      );
}
