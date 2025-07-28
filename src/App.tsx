
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Router';
import { AuthProvider } from './context/authContext';
import { ErrorProvider } from './context/errorContext';

function App() {
  return (
    <AuthProvider>
      <ErrorProvider>
        <RouterProvider router={router} />
      </ErrorProvider>
    </AuthProvider>
  );
}

export default App;