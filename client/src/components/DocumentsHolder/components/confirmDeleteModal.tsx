import React from 'react';
import ModalContainer from '../../ModalContainer';

interface ConfirmDeleteModalProps {
      onConfirm: () => void;
}

export default function ConfirmDeleteModal({ onConfirm }: ConfirmDeleteModalProps) {
      return (
            <ModalContainer id='deleteModal' staticModal>
                  <div className='modal-dialog'>
                        <div className='modal-content'>
                              {/* Cabeçalho do modal */}
                              <div className='modal-header'>
                                    <h3>Deletar documento</h3>
                              </div>

                              {/* Corpo do modal com mensagem de confirmação */}
                              <div className='modal-body'>
                                    <p>
                                          Tem certeza que deseja deletar este documento? Esta ação não poderá ser
                                          desfeita.
                                    </p>
                              </div>

                              {/* Rodapé com botões */}
                              <div className='modal-footer justify-content-between'>
                                    <button type='button' className='btn btn-gray' data-bs-dismiss='modal'>
                                          Cancelar
                                    </button>
                                    <button type='button' className='btn btn-danger text-bright' onClick={onConfirm}>
                                          Deletar
                                    </button>
                              </div>
                        </div>
                  </div>
            </ModalContainer>
      );
}
