import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import LogoCheese from "../../img/LogoCheeseUsa.svg";
import SocialLegal from "./SocialLegal";

const Footer = () => {
  const socialData = useSelector((state) => state.Menu.mainmenu);
  const footerData = useSelector((state) => state.Menu.footer);
  const [state, setState] = useState(false);
  const { footer_text, copyright } = footerData;
  const { social } = socialData;

  useEffect(() => {
    if (footerData && socialData) {
      setState(true);
    }
    AOS.init({
      easing: "ease-in-out",
    });
    AOS.refresh();
  }, [footerData, socialData]);

  return (
    <Container fluid className="p-0 animate__animated animate__fadeIn">
      <Row className="justify-content-center p-4 footer__main no-gutters">
        <Col sm="1" className="text-center">
          <img
            src={LogoCheese}
            className="img-fluid"
            alt="USA Cheese"
            data-aos="fade"            
          />
        </Col>
        <div className="w-100 d-none d-md-block"></div>
        <Col lg="4">
          <SocialLegal social={social} fClass={true} />
        </Col>
        <div className="w-100 d-none d-md-block"></div>
        <Col md="7" lg="5">
          <p
            className="text-center"
                       
          >
            {state ? footer_text : null}
          </p>
          <p
            className="text-center footer__copy"                       
          >
            {state ? copyright : null}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
