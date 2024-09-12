import { Form, useForm } from 'm-open-form';
import { documentIdRequest } from '../../definitions/requests/documentIdRequest';
import { documentsRequest } from '../../definitions/requests/documentsListRequest';
import { Document } from '../../definitions/types/Document';
import React from 'react';
import ModalContainer from '../ModalContainer';
import { InputForm } from '../FormInput';
import { useSubscriber } from 'open-observable';
import { FileInputForm } from '../FileInputForm';
import { notifications } from '../NotificationsRenderer';

async function EditCreateDocumentRequest(document: Document) {
      document.fileType = document?.file?.type;
      if (document.id) {
            return await documentIdRequest.put(document);
      }
      return await documentsRequest.post(document);
}

export default function DocumentEditCreate({
      fileReceived,
      onClose,
      modalId,
}: {
      fileReceived: Document | null;
      onClose: () => void;
      modalId: string;
}) {
      const [model, control] = useForm(EditCreateDocumentRequest, (c) =>
            c.on([fileReceived], (x) => {
                  if ((fileReceived !== null)) x.load(fileReceived);
            })
      );

      console.log(fileReceived);
      control.setSuccess(() => {
            notifications.notify('Documento salvo com sucesso', 'success');
            onClose();
      });

      control.setError((err) => {
            notifications.notify('Algo deu errado', 'error');
      });

      // React.useEffect(() => {
      //       if (fileReceived) control.load(fileReceived);
      // }, [fileReceived]);

      const fileName = useSubscriber(control.field('fileName'));

      return (
            <Form control={control}>
                  <ModalContainer id={modalId} staticModal={true}>
                        <div className='modal-dialog'>
                              <div className='modal-content'>
                                    <div className='modal-header'>
                                          <h3>{fileReceived?.id ? 'Editar documento' : 'Criar documento'}</h3>
                                    </div>
                                    <div className='modal-body'>
                                          <div className='row g-3'>
                                                <div className='col-12'>
                                                      <InputForm
                                                            type='text'
                                                            name={model('title')}
                                                            label='Título'
                                                            required
                                                      />
                                                </div>
                                                <div className='col-12'>
                                                      <InputForm
                                                            type='text'
                                                            name={model('description')}
                                                            label='Descrição'
                                                            required
                                                      />
                                                </div>
                                                <div className='col-12'>
                                                      {fileName ? (
                                                            <>
                                                                  <label className='form-label'>Documento</label>
                                                                  <div className="d-flex align-items-center">
                                                                        <div className='form-control text-nowrap overflow-hidden' style={{textOverflow: 'ellipsis'}}>{fileName}</div>
                                                                        <button type='button' className='btn btn-primary w-100' onClick={() => control.field('fileName').next('')}>
                                                                              Alterar documento
                                                                        </button>
                                                                  </div>
                                                            </>
                                                      ) : (
                                                            <FileInputForm
                                                                  type='file'
                                                                  name={model('file')}
                                                                  label='Documento'
                                                                  required
                                                            />
                                                      )}
                                                </div>
                                          </div>
                                    </div>
                                    <div className='modal-footer justify-content-between'>
                                          <button type='button' className='btn btn-gray' data-bs-dismiss='modal'>
                                                Fechar
                                          </button>
                                          <button type='submit' className='btn btn-success text-bright'>
                                                Salvar
                                          </button>
                                    </div>
                              </div>
                        </div>
                  </ModalContainer>
            </Form>
      );
}