import { Navigate } from 'react-router-dom';
import A from '../views/A';

const routes = [
  {
    path: '/',
    component: () => <Navigate to="/a" />
  },
  {
    path: '/a',
    name: 'a',
    component: A,
    meta: {},
    children: []
  },
  {
    
  }

]