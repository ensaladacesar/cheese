import React, { Fragment, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getSayCheeseAction } from "../actions/saycheeseActions";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./common/Footer";
import Gif1 from "../img/Female_version.gif";
import Gif2 from "../img/Male_version.gif";
import Facebook from "../img/facebook_icon.svg";
import Instagram from "../img/instagram_icon.svg";
import Letrero from "../img/say_letrero.svg";
import HelmetMetaData from "./common/HelmetMetaData";
import Loading from "./common/Loading";
import { socialData } from "../data/socialData";

const SayCheesePage = () => {
  const dispatch = useDispatch();
  const pageLang = useSelector((state) => state.Languages.pagelanguage);
  const pageCountry = useSelector((state) => state.Languages.country);
  const loading = useSelector((state) => state.SayCheese.loading);
  const translate = useSelector((state) => state.Languages.translate);
  const transIndex = useSelector((state) => state.Languages.translateindex);

  useEffect(() => {
    const loadSayCheese = () =>
      dispatch(getSayCheeseAction(pageLang, translate, transIndex));
    loadSayCheese();
    AOS.init({
      easing: "ease-in-out",
    });
    AOS.refresh();
    //eslint-disable-next-line
  }, []);

  const saycheese = useSelector((state) => state.SayCheese.saycheese);
  // console.log(saycheese);
  const {
    header_text,
    title,
    // img01,
    // img02,
    steps,
    instagram_images,
  } = saycheese;
  if (steps === undefined) return null;

  const facebookInta = socialData.map((link, index) =>
    pageLang === link.lang ? (
      <Fragment key={index}>
        <a
          className="say__social"
          rel="noopener noreferrer"
          href={link.facebook}
          target="_blank"
        >
          <img src={Facebook} alt="Facebook" className="img-fluid" />
        </a>
        <a
          className="say__social"
          rel="noopener noreferrer"
          href={link.insta}
          target="_blank"
        >
          <img src={Instagram} alt="Instagram" className="img-fluid" />
        </a>
      </Fragment>
    ) : null
  );

  const facebookIntatr = socialData.map((link, index) =>
    'eng' === link.lang ? (
      <Fragment key={index}>
        <a
          className="say__social"
          rel="noopener noreferrer"
          href={link.facebook}
          target="_blank"
        >
          <img src={Facebook} alt="Facebook" className="img-fluid" />
        </a>
        <a
          className="say__social"
          rel="noopener noreferrer"
          href={link.insta}
          target="_blank"
        >
          <img src={Instagram} alt="Instagram" className="img-fluid" />
        </a>
      </Fragment>
    ) : null
  );

  return (
    <Fragment>
      <HelmetMetaData title={`Say Cheese-${pageCountry}`}/>
      {loading ? <Loading /> : null}      
      <Container
        fluid
        className="p-0 say__main animate__animated animate__fadeIn"
      >
        <Row className="no-gutters say__jumbotron">
          <Col
            lg="7"
            className="text-right say__header col-10 animate__animated animate__fadeInDown"
          >
            {header_text}
            <div className="w-100 d-block py-1"></div>
            {translate ? facebookIntatr : facebookInta}
            {/* <Link to={"/"} className="say__social">
              <img src={Facebook} alt="Facebook" />
            </Link>
            <Link to={"/"} className="say__social">
              <img src={Instagram} alt="Instagram" />
            </Link> */}
          </Col>
          <Col className="col-2 say__pleca__der animate__animated animate__fadeInDown"></Col>
          <Col
            md={{ span: 3, offset: 3 }}
            className="col-10 order-2 order-md-1 mt-5"
          >
            <img
              src={Gif1}
              className="img-fluid animate__animated animate__fadeInUp "
              alt="say Cheese App"
            />
          </Col>
          <Col
            md="3"
            lg="4"
            className="col-10 order-1 order-md-2 say__title animate__animated animate__zoomIn"
          >
            {title}
          </Col>
        </Row>
        <Row className="no-gutters say__steps">
          <Col
            md={{ span: 3, offset: 6 }}
            className="col-10 offset-2 say__img02"
          >
            <img
              src={Gif2}
              className="img-fluid"
              alt="say Cheese App"
              data-aos="fade-up"
              data-aos-anchor-placement="top-center"
            />
          </Col>
          <Col sm={{ span: 10, offset: 1 }}>
            <Row
              className={`no-gutters justify-content-center ${
                pageLang === "gcc" ? "rtl " : ""
              }`}
            >
              {steps.map((step, index) => (
                <Col
                  md="6"
                  lg="3"
                  key={index}
                  className="col-10 say__step"
                  data-aos="fade"
                  data-aos-anchor-placement="top-center"
                >
                  <div
                    className={`say__stepText ${
                      pageLang === "gcc" ? "rtl " : ""
                    }`}
                  >
                    <p>
                      <strong>{step.num}</strong>
                    </p>
                    <p>{step.step_text}</p>
                  </div>
                  <div
                    className={`say__stepImg ${
                      pageLang === "gcc" ? "rtl" : ""
                    }`}
                  >
                    <img src={Letrero} alt="Steps" className="img-fluid" />
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
          <div className="w-100 d-block py-4"></div>
        </Row>
        <Row className="no-gutters row-cols-2 row-cols-md-4 say__instaImage">
          {instagram_images.map((instImg, index) => (
            <Col
              key={index}
              data-aos="fade"
              data-aos-anchor-placement="top-center"
            >
              <a href={instImg.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={instImg.image}
                  className="img-fluid"
                  alt="Instagram USA Cheese"
                />
              </a>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default SayCheesePage;
