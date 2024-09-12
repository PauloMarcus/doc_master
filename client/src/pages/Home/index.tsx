import React from 'react';

export default function Home() {
      const logo = require('../../assets/svg/doc_master_logo.svg').default;

      return (
            <div className='container h-100'>
                  <div className='row flex-column flex-lg-row h-100 align-items-center justify-content-center'>
                        <div className='col-12 col-lg-6 d-flex justify-content-center justify-content-lg-end align-items-start align-items-lg-center'>
                              <img src={logo} alt='Logotipo docmaster' className='object-fit-contain h-auto' />
                        </div>
                        <div className='col-12 col-lg-6'>
                              <div className="row justify-content-center justify-content-lg-start align-items-start align-items-lg-center">
                                    <div className='col-12 col-lg-8'>
                                          <h5 className='text-primary'>Bem-vindo ao Doc Master</h5>
                                    </div>
                                    <div className='col-12 col-lg-8'>
                                          <p className=''>
                                                Aqui você pode armazenar e gerenciar todos os seus documentos de forma
                                                segura e organizada.
                                          </p>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
}
