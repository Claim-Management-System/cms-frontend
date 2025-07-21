import React from 'react';
import './UserTitle.css';

interface UserTitleProps {
  mainText: string;
  subText: string;
}

const UserTitle: React.FC<UserTitleProps> = ({ mainText, subText }) => {
  return (
    <div className="user-title-container">
      <h1 className="main-text">{mainText}</h1>
      <p className="sub-text">{subText}</p>
    </div>
  );
};

export default UserTitle; 