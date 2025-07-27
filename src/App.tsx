
// import { RouterProvider } from 'react-router-dom';
// import { router } from './routes/Router';
// import { AuthProvider } from './context/authContext';
// import { ErrorProvider } from './context/errorContext';
import AddEmployee from "./pages/add_employee/AddEmployee";
import type { EmployeeInterface } from "./components/employeeInfo/EmployeeInfo";

function App() {

  const employeeData: EmployeeInterface = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    dob: '1990-01-01',
    joiningDate: '2020-01-15',
    role: 'user',
    roleExtension: 'normal',
    employeeType: 'permanent',
    team: 'Development',
    bankAccountNumber: '1234567890',
    employeeId: 'EMP123',
    maritalStatus: 'single',
  }

  return (
    // <AuthProvider>
    //   <ErrorProvider>
    //     <RouterProvider router={router} />
    //   </ErrorProvider>
    // </AuthProvider>
    <AddEmployee mode="edit" employeeData={employeeData} />
  );
}

export default App;