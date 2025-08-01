import type { ProfileSection } from '../../types';
import './ProfileTable.css';


function ProfileTable({ title, details }: ProfileSection) {
  return (
    <div className="profile-table-container">
      <h2 className="profile-table-title">{title}</h2>
      <div className="profile-table">
        {details.map((detail, index) => (
          <div className="profile-table-row" key={index}>
            <div className="profile-table-label">{detail.label}</div>
            <div className="profile-table-value">{detail.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileTable; 