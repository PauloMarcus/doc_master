import MainDashboard from '../mainDashboard';
import { createPages, mergePages } from './components/createPages';
import Home from '../../pages/Home';
import Documents from '../../pages/Documents';

export const pages = mergePages(
      createPages(MainDashboard, {
            '/home': [Home],
            '/meus-documentos': [Documents]
      })
);
