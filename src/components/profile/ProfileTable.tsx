import React from 'react';
import './ProfileTable.css';

interface ProfileDetail {
  label: string;
  value: string;
}

interface ProfileTableProps {
  title: string;
  details: ProfileDetail[];
}

const ProfileTable: React.FC<ProfileTableProps> = ({ title, details }) => {
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