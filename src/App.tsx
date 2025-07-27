
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Router';
import { AuthProvider } from './context/authContext';
import { ErrorProvider } from './context/errorContext';
import AdminDashboard from './pages/dashboard/AdminDashboard';

function App() {
  return (

    // <AuthProvider>
    //   <ErrorProvider>
    //     <RouterProvider router={router} />
    //   </ErrorProvider>
    // </AuthProvider>
    <AdminDashboard />
  );
}

export default App;