import React, { useState } from 'react';
import DocumentCard from '../DocumentCard';
import { documentsRequest } from '../../definitions/requests/documentsListRequest';
import { useSubscriber } from 'open-observable';
import useModal from '../others/useModal';
import DocumentEditCreate from '../DocumentEditCreate';
import ModalTrigger from '../ModalContainer/components/modalTrigger';
import { Document } from '../../definitions/types/Document';
import { documentIdRequest } from '../../definitions/requests/documentIdRequest';
import ConfirmDeleteModal from './components/confirmDeleteModal';
import uuid from 'react-uuid';
import Breadcrumb from '../Breadcrumb';
import DocumentList from '../DocumentList';
import { useDatasource } from '../others/use-datasource';
import DateFilter from './components/dateFilter';
import OrderFilter from './components/orderFilter';
import Header from './components/Header';
import Footer from './components/Footer';

export default function DocumentsHolder() {
      const documentsListRequest = useDatasource(documentsRequest.get);
      const documentsList = useSubscriber(documentsListRequest.items);
      const [viewTypeList, setViewTypeList] = useState(true);

      const modal = useModal();

      // Função para deletar documento e atualizar a lista
      async function deleteDocument(id: number) {
            await documentIdRequest.delete({ id });
            documentsListRequest.refresh();
      }

      // Função para abrir modal de edição/criação de documento
      const openDocument = (file?: Document | null) => {
            const modalId = uuid();
            modal.addModal(
                  <DocumentEditCreate
                        modalId={modalId}
                        onClose={() => {
                              documentsListRequest.refresh();
                              modal.removeModal(modalId);
                        }}
                        fileReceived={file ?? null}
                  />,
                  modalId
            );
            setTimeout(() => ModalTrigger(modalId), 1);
      };

      // Função para confirmar exclusão de documento
      const onDeleteDocument = (file: Document) => {
            modal.addModal(
                  <ConfirmDeleteModal
                        onConfirm={() => deleteDocument(file.id).then(() => modal.removeModal('deleteModal'))}
                  />,
                  'deleteModal'
            );
            setTimeout(() => ModalTrigger('deleteModal'), 1);
      };

      return (
            <>
                  <div className='d-flex justify-content-between flex-column flex-lg-row align-items-md-center py-2 mb-3'>
                        <Breadcrumb />
                        <Header
                              viewTypeList={viewTypeList}
                              setViewTypeList={setViewTypeList}
                              openDocument={openDocument}
                              setFilter={(e) => documentsListRequest.setFilter(e)}
                        />
                  </div>

                  <div className='container-fluid '>
                        <div className='container overflow-auto'>
                              <div className='row g-2  '>
                                    {/* Visualização de lista ou cards */}
                                    {!viewTypeList ? (
                                          documentsList?.map((document) => (
                                                <DocumentCard
                                                      key={document.id}
                                                      document={document}
                                                      onEdit={openDocument}
                                                      onDelete={onDeleteDocument}
                                                />
                                          ))
                                    ) : (
                                          <table className='table table-responsive'>
                                                <thead>
                                                      <tr>
                                                            <OrderFilter
                                                                  setFilter={documentsListRequest.setFilter}
                                                                  field='title'
                                                                  title='Título'
                                                            />
                                                            <OrderFilter
                                                                  setFilter={documentsListRequest.setFilter}
                                                                  field='fileName'
                                                                  title='Nome do Arquivo'
                                                            />
                                                            <th>Descrição</th>
                                                            <DateFilter setFilter={documentsListRequest.setFilter} />
                                                            <th>Ações</th>
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                      {documentsList?.map((document) => (
                                                            <DocumentList
                                                                  key={document.id}
                                                                  document={document}
                                                                  onEdit={openDocument}
                                                                  onDelete={onDeleteDocument}
                                                            />
                                                      ))}
                                                </tbody>
                                          </table>
                                    )}
                              </div>

                              {/* Paginação no rodapé */}
                        </div>
                              <div className='row'>
                                    <Footer source={documentsListRequest} />
                              </div>
                  </div>
            </>
      );
}
