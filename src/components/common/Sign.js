import React, {  useState } from "react";
import SignRedMobile from '../../img/LetreroBase01Mobile.svg';
import SignRed from '../../img/LetreroBase01.svg';
import SignBlueMobile from '../../img/LetreroBase02Mobile.svg';
import SignBlue from '../../img/LetreroBase02.svg';

const Sign = ({ signText, sClass }) => {
  // eslint-disable-next-line
  const [normalClass, setNormalClass] = useState(sClass);
  
  return (
    <div className="sign__main d-flex justify-content-center align-items-center">
      <p>
        {signText}
      </p>
      <img src={normalClass ? SignRedMobile: SignBlueMobile} className="img-fluid d-block d-lg-none" alt="Sign"/>
      <img src={normalClass ? SignRed : SignBlue} className="img-fluid d-none d-lg-block" alt="Sign"/>
    </div>
  );
};

export default Sign;
