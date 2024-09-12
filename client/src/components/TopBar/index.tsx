import React from 'react';
import { NavLink } from 'react-router-dom';
import AboutModal from './aboutModal';
import useModal from '../others/useModal';
import ModalTrigger from '../ModalContainer/components/modalTrigger';

export default function NavBar({ children }: { children: React.ReactNode }) {
      const [collapsed, setCollapsed] = React.useState(false);

      const toggleSidebar = () => {
            setCollapsed(!collapsed); 
      };

      const modal = useModal();

      const openAboutModal = () => {
            modal.addModal(<AboutModal />, 'aboutModal');
            setTimeout(() => {
                  ModalTrigger('aboutModal');
            }, 1);
      }; 

      return (
            <>
                  <nav className='navbar navbar-expand-lg navbar-dark bg-primary align-items-center d-flex flex-nowrap'>
                        <div className='container-fluid d-flex align-items-center'>
                              <button
                                    role='button'
                                    onClick={() => toggleSidebar()}
                                    className='d-none d-md-block bg-transparent text-decoration-none border-0 w-auto'
                              >
                                    <i className='bi bi-list fs-2 text-white'></i>
                              </button>
                              <button
                                    role='button'
                                    data-bs-toggle='offcanvas'
                                    data-bs-target='#menuMobileOffcanvas'
                                    className='d-md-none bg-transparent text-decoration-none border-0 w-auto'
                              >
                                    <i className='bi bi-list fs-2 text-white'></i>
                              </button>
                              <p className='mb-0 w-auto text-white fw-bold fs-4'>DOCMASTER</p>
                        </div>
                  </nav>

                  <div className='container-fluid main-content'>
                        <div className='row h-100 flex-nowrap'>
                              <div
                                    className={`d-none col-md-3   p-0 overflow-hidden box-shadow col-lg- d-md-block bg-light sidebar ${
                                          collapsed ? 'collapsed' : ''
                                    }`}
                              >
                                    <nav className='d-md-block bg-light'>
                                          <div className='position-sticky pt-3'>
                                                <ul className='nav flex-column '>
                                                      <NavLink
                                                            to='/home'
                                                            className=' nav-link  d-flex justify-content-between '
                                                      >
                                                            <span className='nav-link-text text-nowrap'>Início</span>

                                                            <i className='bi bi-house-door-fill'></i>
                                                      </NavLink>

                                                      <NavLink
                                                            to='/meus-documentos'
                                                            className=' nav-link  d-flex justify-content-between '
                                                      >
                                                            <span className='nav-link-text text-nowrap'>
                                                                  Meus Documentos
                                                            </span>

                                                            <i className='bi bi-file-earmark-fill'></i>
                                                      </NavLink>
                                                      <div
                                                                  onClick={() => openAboutModal()}
                                                                  className=' nav-link cursor-pointer d-flex justify-content-between'
                                                            >
                                                                  
                                                                  <span className='nav-link-text text-nowrap'>
                                                                  Sobre
                                                            </span>

                                                                  <i className='bi bi-info-circle-fill'></i>
                                                            </div>
                                                </ul>
                                          </div>
                                    </nav>
                              </div>

                              <div
                                    className='offcanvas offcanvas-start px-0 '
                                    style={{ marginTop: '56px' }}
                                    data-bs-backdrop='false'
                                    id='menuMobileOffcanvas'
                                    aria-labelledby='offcanvasLabel'
                                    data-bs-dismiss='offcanvas'
                              >
                                    <div className='offcanvas-body w-100 px-0'>
                                          <nav id='sidebarMenu' className='d-md-block bg-light sidebar w-100'>
                                                <div className='position-sticky w-100'>
                                                      <ul className='nav flex-column'>
                                                            <NavLink
                                                                  to='/home'
                                                                  className=' nav-link  d-flex justify-content-between'
                                                            >
                                                                  <a className='unstyled' href='/home'>
                                                                        Início
                                                                  </a>
                                                                  <i className='bi bi-house-door-fill'></i>
                                                            </NavLink>

                                                            <NavLink
                                                                  to='/meus-documentos'
                                                                  className='nav-link  d-flex justify-content-between'
                                                            >
                                                                  <a className=' unstyled '>Meus Documentos</a>
                                                                  <i className='bi bi-file-earmark-fill'></i>
                                                            </NavLink>
                                                            <div
                                                                  onClick={() => openAboutModal()}
                                                                  className=' nav-link  d-flex justify-content-between'
                                                            >
                                                                  <a className='unstyled'>Sobre</a>

                                                                  <i className='bi bi-info-circle-fill'></i>
                                                            </div>
                                                      </ul>
                                                </div>
                                          </nav>
                                    </div>
                              </div>

                              <main className='ms-sm-auto col px-md-4 overflow-auto'>{children}</main>
                        </div>
                  </div>
            </>
      );
}
