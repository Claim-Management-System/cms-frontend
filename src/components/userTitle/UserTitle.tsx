import React from 'react';
import { useAuth } from '../../context/authContext';
import './UserTitle.css';

interface UserTitleProps {
    mainText: string;
}

const UserTitle: React.FC<UserTitleProps> = ({ mainText }) => {
    const { user } = useAuth();

    return (
        <div className="user-title-container">
            <h1 className="main-text">{mainText}</h1>
            <p className="sub-text">{user?.employee_name}</p>
        </div>
    );
};

export default UserTitle;