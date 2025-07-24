import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem('access'); // Vérifiez si le token existe

  // Si pas de token, redirigez l'utilisateur vers la page de connexion
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children; // Affiche le composant enfant si l'utilisateur est authentifié
};

export default PrivateRoute;
