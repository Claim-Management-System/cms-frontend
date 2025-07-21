
// import { RouterProvider } from 'react-router-dom';
// import { router } from './routes/Router';
// import { AuthProvider } from './context/authContext';
// import { ErrorProvider } from './context/errorContext';
import Miscellaneous from './pages/add_request/Miscellaneous';
import OutPatient from './pages/add_request/OutPatient';

function App() {
  return (

    // <AuthProvider>
    //   <ErrorProvider>
    //     <RouterProvider router={router} />
    //   </ErrorProvider>
    // </AuthProvider>
    <Miscellaneous />
  );
}

export default App;