import React from 'react';
import ModalContainer from '../ModalContainer';

export default function AboutModal() {
      const logo = require('../../assets/svg/doc_master_logo.svg').default;

      return (
            <ModalContainer id={'aboutModal'} staticModal={true}>
                  <div className='modal-dialog modal-dialog-centered'>
                        <div className='modal-content'>
                              <div className='modal-body text-center row align-items-center justify-content-center rounded-4'>
                                    <img src={logo} height={200} alt='Logotipo docmaster' className='object-fit-contain ' />
                                    <p>DOCMASTER SOFTWARE S.A. CNPJ: 12.345.678/0001-09</p>
                                    <p>Versão: 1.23.456</p>
                              </div>
                        </div>
                  </div>
            </ModalContainer>
      );
}
