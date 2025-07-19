
// import { RouterProvider } from 'react-router-dom';
// import { router } from './routes/Router';
// import { AuthProvider } from './context/authContext';
// import { ErrorProvider } from './context/errorContext';
import ViewMore from './pages/view_more/ViewMore';
import type { MiscFormData, OpdFormData } from './types';

function App() {
  const sampleImages = [
    "https://i.pinimg.com/564x/34/7b/40/347b40a091f421e63e060bd22e6e1b86.jpg",
    "https://docelf.com/images/templates/word_simple_receipt_template.png"

  ];

  const miscFormData: MiscFormData = {
    title: 'Office Supplies Purchase',
    itemType: 'Stationery',
    description: 'Bought new pens and notebooks for the team.',
    totalAmount: '150.00',
  };

  const opdFormData: OpdFormData = {
    title: 'Doctor Visit',
    patientName: 'John Doe',
    relationship: 'Self',
    purposeOfVisit: 'Monthly Checkup',
    expenseType: 'Consultation',
    totalAmount: '500.00',
  };


  return (

    // <AuthProvider>
    //   <ErrorProvider>
    //     <RouterProvider router={router} />
    //   </ErrorProvider>
    // </AuthProvider>
    <>
      <ViewMore
        formType="MISCELLANEOUS EXPENSE FORM"
        formData={miscFormData}
        date="2024-07-30"
        time="10:00 AM"
        status="Accepted"
        images={sampleImages}
      />
    </>
  );
}

export default App;