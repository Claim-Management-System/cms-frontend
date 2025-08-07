import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../Layout';
import ProtectedRoute from './ProtectedRoutes';

import Login from '../pages/login/Login';
import AdminDashboard from '../pages/dashboard/AdminDashboard';
import UserDashboard from '../pages/dashboard/UserDashboard';
import AddRquest_OutPatient from '../pages/add_request/OutPatient';
import AddRequest_Miscellaneous from '../pages/add_request/Miscellaneous';
import ClaimRequests_OutPatient from '../pages/claim_requests/OutPatient'
import ClaimRequests_Miscellaneous from '../pages/claim_requests/Miscellaneous'
import ClaimHistory_OutPatient from '../pages/claim_history/OutPatient';
import ClaimHistory_Miscellaneous from '../pages/claim_history/Miscellaneous';
import UserProfile from '../pages/user_profile/UserProfile';
import AddEmployee from '../pages/add_employee/AddEmployee';
import ClaimDetails from '../pages/claim_details/ClaimDetails';
import EmployeeList from '../pages/employee_list/EmployeeList';
import EmployeeProfile from '../pages/employee_profile/EmployeeProfile';
import EditProfile from '../pages/edit_employee_profile/EditProfile';
import TestingPopups from '../pages/testing_popups/TestingPopups';

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },

  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        element: <ProtectedRoute allowedRoles={['employee']} />,
        children: [
          { path: '/', element: <UserDashboard />},
        ],
      },

      {
        element: <ProtectedRoute allowedRoles={['admin', 'employee']} />,
        children: [
          { path: 'new-request/outpatient', element: <AddRquest_OutPatient /> },
          { path: 'new-request/miscellaneous', element: <AddRequest_Miscellaneous /> },
          { path: 'claim-history/outpatient', element: <ClaimHistory_OutPatient /> },
          { path: 'claim-history/miscellaneous', element: <ClaimHistory_Miscellaneous /> },
          { path: 'claim-details/:claimId', element: <ClaimDetails /> },
          { path: 'profile', element: <UserProfile /> },
        ],
      },

      {
        element: <ProtectedRoute allowedRoles={['admin']} />,
        children: [
          { path: 'admin-dashboard', element: <AdminDashboard />},
          { path: 'claim-requests/outpatient', element: <ClaimRequests_OutPatient /> },
          { path: 'claim-requests/miscellaneous', element: <ClaimRequests_Miscellaneous /> },
          { path: 'add-employee', element: <AddEmployee /> },
          { path: 'employee-list', element: <EmployeeList /> },
          { path: 'employee-profile/:employeeId', element: <EmployeeProfile /> },
          { path: 'employee-profile/edit/:employeeId', element: <EditProfile /> },
        ],
      },
      { path: 'testing-popups', element: <TestingPopups /> },
    ],
  },
]);