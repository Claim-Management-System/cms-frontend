import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';

interface ProtectedRouteProps {
  allowedRoles: Array<'admin' | 'user'>;
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  // const { user } = useAuth();

  // if (!user || !user.role) {
  //   return <Navigate to="/login" replace />;
  // }

  // const isAuthorized = allowedRoles.includes(user.role);
  // return isAuthorized ? <Outlet /> : <Navigate to="/login" replace />;
  return <Outlet />;
};

export default ProtectedRoute;