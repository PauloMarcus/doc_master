import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Tradução do nome das rotas
const routeNameMap: { [key: string]: string } = {
  'documentos': 'Documentos',
  'meus-documentos': 'Meus Documentos',
};

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  
  // Dividir a URL em partes para gerar o breadcrumb
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb mb-0 align-items-center d-flex">
        <li className="breadcrumb-item">
          <Link to="/">Início</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <li key={to} className="breadcrumb-item active" aria-current="page">
              {routeNameMap[value] || decodeURIComponent(value)}
            </li>
          ) : (
            <li key={to} className="breadcrumb-item">
              <Link to={to}>{routeNameMap[value] || decodeURIComponent(value)}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
