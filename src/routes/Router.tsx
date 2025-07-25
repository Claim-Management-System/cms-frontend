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
import Drafts from '../pages/draft/Drafts';

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },

  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        element: <ProtectedRoute allowedRoles={['user']} />,
        children: [
          { path: '/', element: <UserDashboard />},
          { path: 'drafts', element: <Drafts /> },
        ],
      },

      {
        element: <ProtectedRoute allowedRoles={['admin', 'user']} />,
        children: [
          { path: 'new-request/outpatient', element: <AddRquest_OutPatient /> },
          { path: 'new-request/miscellaneous', element: <AddRequest_Miscellaneous /> },
          { path: 'claim-history/outpatient', element: <ClaimHistory_OutPatient /> },
          { path: 'claim-history/miscellaneous', element: <ClaimHistory_Miscellaneous /> },
        ],
      },

      {
        element: <ProtectedRoute allowedRoles={['admin']} />,
        children: [
          { path: 'admin-dashboard', element: <AdminDashboard />},
          { path: 'claim-requests/outpatient', element: <ClaimRequests_OutPatient /> },
          { path: 'claim-requests/miscellaneous', element: <ClaimRequests_Miscellaneous /> },
        ],
      },
    ],
  },
]);