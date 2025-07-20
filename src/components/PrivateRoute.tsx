import { Navigate } from 'react-router-dom';
import { isTokenValid } from '../utils/auth';

interface Props {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: Props) {
  const token = localStorage.getItem('access');

  if (!isTokenValid(token)) {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    return <Navigate to="/" replace />;
  }

  return children;
}
