import './LoginScreen.css';
import LoginCard from '../components/LoginCard.tsx';

import iconTopRight from '../assets/logos/icon-top-right.svg';
import securitiLogo from '../assets/logos/securiti-logo.svg';
import iconBottomLeft from '../assets/logos/icon-bottom-left.svg';
import iconMobile from '../assets/logos/icon-mobile.svg';

function SplitScreenLayout() {

  return (
    <div className="container">
      <div className="innerBox inner1">
        <img src={iconTopRight} alt="Icon Top Right" className="iconTopRight desktop-icon" />
        <img src={securitiLogo} alt="Company Logo" className="logo" />
        <img src={iconBottomLeft} alt="Decorative graphic" className="iconBottomLeft desktop-icon" />
      </div>
      
      <div className="innerBox inner2">
        <LoginCard />
      </div>
      
      <img src={iconMobile} alt="Icon Top Right" className="iconTopRight mobile-icon" />
      <img src={iconMobile} alt="Decorative graphic" className="iconBottomLeft mobile-icon" />
    </div>
  );
};

export default SplitScreenLayout;