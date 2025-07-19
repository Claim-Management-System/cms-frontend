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

  // Admin-related data
  // To test different scenarios:
  // - Set userRole to 'admin' to show admin buttons
  // - Set userRole to 'user' or any other value to hide admin buttons
  const adminData = {
    userRole: 'admin', // Change to 'user' to hide admin buttons
    employeeName: 'John Doe',
    employeeId: 'EMP001',
    totalAmount: 150.00, // Total amount from the form
  };

  // Event handlers for admin actions
  const handleAccept = () => {
    console.log('Request accepted by admin');
    alert('Request has been accepted!');
  };

  const handleDecline = (reason: string) => {
    console.log('Request declined by admin. Reason:', reason);
    alert(`Request has been declined. Reason: ${reason}`);
  };

  const handleForwardToFinance = () => {
    console.log('Request forwarded to finance department');
    alert('Request has been forwarded to the finance department!');
  };


  return (
    <>
      <ViewMore
        formType="MISCELLANEOUS EXPENSE FORM"
        formData={miscFormData}
        date="2024-07-30"
        time="10:00 AM"
        status="Pending"
        images={sampleImages}
        userRole={adminData.userRole}
        employeeName={adminData.employeeName}
        employeeId={adminData.employeeId}
        totalAmount={adminData.totalAmount}
        onAccept={handleAccept}
        onDecline={handleDecline}
        onForwardToFinance={handleForwardToFinance}
      />
    </>
  );
}

export default App;