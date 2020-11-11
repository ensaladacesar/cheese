import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLangSocialAction } from "../../actions/languagesActions";
import { closeMenuAction } from "../../actions/menuActions";
import { Row, Col } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Facebook from "../../img/facebook_icon.svg";
import Instagram from "../../img/instagram_icon.svg";
import {socialData} from '../../data/socialData';

const SocialLegal = ({ social, fClass }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const pageLang = useSelector((state) => state.Languages.pagelanguage);
  const translate = useSelector((state) => state.Languages.translate);
  const [state, setState] = useState(false);
  const [changeLang, setChangeLang] = useState({
    value: pageLang,
  });

  const { value } = changeLang;

  useEffect(() => {
    if (social) {
      setState(true);
      // console.log(changeLang.value);
    }
    if (value !== pageLang) {
      // console.log(changeLang.value);
      let currentPath = location.pathname;
      dispatch(changeLangSocialAction(value));
      history.replace(`${currentPath}/replace`);
      closemenu();
      setTimeout(() => {
        history.replace(currentPath);
      }, 500);
    }
    AOS.init({
      easing: "ease-in-out",
    });
    AOS.refresh();

    //eslint-disable-next-line
  }, [social, value]);
  // eslint-disable-next-line
  const [footerClass, setFooterClass] = useState(fClass);

  const handleChangeLang = (e) => {
    setChangeLang({
      value: e.target.value,
    });
  };

  const closemenu = () => {
    document.getElementById("root").style.overflow = "initial";
    dispatch(closeMenuAction());
  };

  const facebookInta = socialData.map((link, index) =>
    pageLang === link.lang ? (
      <Fragment key={index}>
        <a
          className="social__link"
          rel="noopener noreferrer"
          href={link.facebook}
          target="_blank"
        >
          <img src={Facebook} alt="Facebook" className="img-fluid"  />
        </a>
        <a
          className="social__link"
          rel="noopener noreferrer"
          href={link.insta}
          target="_blank"
        >
          <img src={Instagram} alt="Instagram" className="img-fluid"  />
        </a>
      </Fragment>
    ) : null
  );

  const facebookIntatr = socialData.map((link, index) =>
  'eng' === link.lang ? (
    <Fragment key={index}>
      <a
        className="social__link"
        rel="noopener noreferrer"
        href={link.facebook}
        target="_blank"
      >
        <img src={Facebook} alt="Facebook" className="img-fluid"  />
      </a>
      <a
        className="social__link"
        rel="noopener noreferrer"
        href={link.insta}
        target="_blank"
      >
        <img src={Instagram} alt="Instagram" className="img-fluid"  />
      </a>
    </Fragment>
  ) : null
);

  return (
    <Row className="justify-content-center social__main align-items-center my-4" data-aos="fade"
    data-aos-anchor-placement="bottom-bottom">
      <Col>
        <select
          name="languages"
          id="languagesID"
          className={`social__select ${
            footerClass ? "social__footer" : "social__menu"
          }`}
          onChange={(e) => handleChangeLang(e)}
          value={pageLang}
        >
          {/* <option value="">Select</option> */}
          {state
            ? social[0].languages.map((language, index) => (
                <option value={language.lang} key={index}>
                  {language.namel}
                </option>
              ))
            : null}
        </select>
      </Col>

      {pageLang === "ch" ? null : state ? (
        <Fragment>
          <Col xs="auto">
            <p className="m-0 social__text">{social[0].follow}</p>
          </Col>
          <Col className="ml-n3">{translate? facebookIntatr : facebookInta}</Col>
        </Fragment>
      ) : null}
    </Row>
  );
};

export default SocialLegal;
