import ViewMore from './pages/view_more/ViewMore';
import type { MiscFormData, OpdFormData } from './types';

function App() {
  const sampleImages = [
    "https://i.pinimg.com/564x/34/7b/40/347b40a091f421e63e060bd22e6e1b86.jpg",
    "https://docelf.com/images/templates/word_simple_receipt_template.png"

  ];

  const miscFormData: MiscFormData = {
    title: 'Office Supplies Purchase',
    itemType: 'Other',
    otherItemType: 'Custom office equipment',
    description: 'Bought new pens and notebooks for the team.',
    totalAmount: '150.00',
  };

  const opdFormData: OpdFormData = {
    title: 'Doctor Visit',
    patientName: 'John Doe',
    relationship: 'Self',
    purposeOfVisit: 'Other',
    otherPurposeOfVisit: 'Specialist consultation',
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
    employeeEmail: 'shane.securiti.com',
    employeeId: 'EMP001',
    totalAmount: 150.00, // Total amount from the form
  };

  // Event handlers for admin actions
  const handleAccept = () => {
    console.log('Request accepted by admin');
  };

  const handleDecline = (reason: string) => {
    console.log('Request declined by admin. Reason:', reason);
  };

  const handleEdit = (newAmount: number, reason: string) => {
    const updatedData = {
      ...miscFormData,
      totalAmount: newAmount.toString(),
    };
    console.log('Request edited by admin. Reason:', reason, 'New Data:', updatedData);
  };


  return (
    <>
      {/* <ViewMore
        formType="MISCELLANEOUS EXPENSE FORM"
        formData={miscFormData}
        date="2024-07-30"
        time="10:00 AM"
        status="Pending"
        images={sampleImages}
        userRole={adminData.userRole}
        employeeName={adminData.employeeName}
        employeeEmail={adminData.employeeEmail}
        employeeId={adminData.employeeId}
        totalAmount={adminData.totalAmount}
        onAccept={handleAccept}
        onDecline={handleDecline}
        onEdit={handleEdit}
      /> */}
      <ViewMore
        formType="OUT PATIENT CLAIM FORM"
        formData={opdFormData}
        date="2024-07-30"
        time="11:30 AM"
        status="Pending"
        images={sampleImages}
        userRole={adminData.userRole}
        employeeName={adminData.employeeName}
        employeeEmail={adminData.employeeEmail}
        employeeId={adminData.employeeId}
        totalAmount={parseFloat(opdFormData.totalAmount)}
        onAccept={handleAccept}
        onDecline={handleDecline}
        onEdit={handleEdit}
      />
    </>
  );
}

export default App;