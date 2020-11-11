import React, { Fragment, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
// components
import Footer from "./common/Footer";
import CallOut from "./common/CallOut";
import Related from "./common/Related";
import YourRecipe from "./common/YourRecipe";
import HelmetMetaData from "./common/HelmetMetaData";
// imgs
import Facebook from "../img/facebook_icon.svg";
// import Portada from "../img/portada_main.svg";
// import Image01 from "../img/jukebox_template_01.svg";
// import Image02 from "../img/jukebox_template_02.svg";
import Title01 from "../img/title_know_yourcheese.svg";
import { getJukeResultAction } from "../actions/jukeboxActions";
import { useParams } from "react-router-dom";
import { FacebookShareButton } from "react-share";
import { textData } from "../data/textData";
import Loading from "./common/Loading";


const JukeboxTemplatePage = () => {
  const dispatch = useDispatch();
  const { cheese } = useParams();
  const pageLang = useSelector((state) => state.Languages.pagelanguage);
  const pageCountry = useSelector((state) => state.Languages.country);
  const jukeboxSeleted = useSelector((state) => state.Jukebox.jukeboxselected);
  const loading = useSelector((state) => state.Jukebox.loading);
  const translate = useSelector((state) => state.Languages.translate);
  const transIndex = useSelector((state) => state.Languages.translateindex);


  useEffect(() => {
    const loadJukeResult = () =>
      dispatch(getJukeResultAction(pageLang, cheese, translate, transIndex));
    loadJukeResult();

    if (cheese !== jukeboxSeleted) {
      // console.log("si es queso", cheese);
      // console.log("si es selected", jukeboxSeleted);
      setTimeout(() => {
        // AOS.refresh();
        window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
      }, 500);
      clearTimeout();
    }
    AOS.init({
      easing: "ease-in-out",
    });
    AOS.refresh();
    //eslint-disable-next-line
  }, [cheese, jukeboxSeleted]);

  const jukeResult = useSelector((state) => state.Jukebox.jukeboxresult);
  // console.log(jukeResult);
  const {
    cover,
    description,
    img01,
    img02,
    share,
    subtitle1,
    exterior,
    flavor,
    texture,
    kitchen,
    perfect_match,
    cheese_family,
    varieties,
    fun_fact,
    subtitle2,
    recipe_video,
    recipe_link,
    related_title,
    related,
    callout,
  } = jukeResult;

  const textJukebox = textData.map((text, index) =>
    pageLang === text.lang  ? (
      <Fragment key={index}>
        <p>
          <strong>{text.exterior}:</strong> {exterior}
        </p>
        <p>
          <strong>{text.flavor}:</strong> {flavor}
        </p>
        <p>
          <strong>{text.texture}:</strong> {texture}
        </p>
        <p>
          <strong>{text.kitchen}:</strong> {kitchen}
        </p>
        <p>
          <strong>{text.match}:</strong> {perfect_match}
        </p>
        <p>
          <strong>{text.family}:</strong> {cheese_family}
        </p>
        <p>
          <strong>{text.varieties}:</strong> {varieties}
        </p>
        <p>
          <strong>{text.fun}:</strong> {fun_fact}
        </p>
      </Fragment>
    ) : null
  );

  const textJukeboxtr = textData.map((text, index) =>
    'eng' === text.lang  ? (
      <Fragment key={index}>
        <p>
          <strong>{text.exterior}:</strong> {exterior}
        </p>
        <p>
          <strong>{text.flavor}:</strong> {flavor}
        </p>
        <p>
          <strong>{text.texture}:</strong> {texture}
        </p>
        <p>
          <strong>{text.kitchen}:</strong> {kitchen}
        </p>
        <p>
          <strong>{text.match}:</strong> {perfect_match}
        </p>
        <p>
          <strong>{text.family}:</strong> {cheese_family}
        </p>
        <p>
          <strong>{text.varieties}:</strong> {varieties}
        </p>
        <p>
          <strong>{text.fun}:</strong> {fun_fact}
        </p>
      </Fragment>
    ) : null
  );

  return (
    <Fragment>
      <HelmetMetaData title={`Jukebox Cheese-${pageCountry}`} />
      {loading ? <Loading /> : null}    
      <Container
        fluid
        className="jukeboxTemplate__main p-0 animate__animated animate__fadeIn"
      >
        <Row className="jukeboxTemplate__header justify-content-center no-gutters">
          <Col lg={5} className="text-center col-10">
            <img
              src={cover}
              className="img-fluid animate__animated animate__zoomIn "
              alt="Portada"
            />
          </Col>
        </Row>
        <Row className="jukeboxTemplate__description justify-content-start no-gutters">
          <Col
            lg="7"
            xl="6"
            className="col-10 jukeboxTemplate__p d-flex align-items-center animate__animated animate__fadeIn  animate__delay-1s"
          >
            <Row className="no-gutters justify-content-center">
              <Col className="col-8">
                <p className={`${pageLang === "gcc" ? "rtl text-right" : ""}`}>
                  {description}
                </p>
              </Col>
              <div className="w-100 d-none d-md-block"></div>
              <Col
                className={`col-8 ${
                  pageLang === "gcc" ? "rtl text-right" : ""
                }`}
              >
                <FacebookShareButton
                  className="general__facebookShare animate__animated animate__fadeIn animate__delay-1s"
                  url={"https://www.usacheeseexperience.com/"}
                  openShareDialogOnClick={true}
                >
                  {share} <img src={Facebook} alt="Share on Facebook" />
                </FacebookShareButton>
              </Col>
            </Row>
          </Col>
          <Col className="pleca__derecha col-1 animate__animated animate__fadeIn animate__delay-1s"></Col>
          <div className="w-100 d-none d-md-block"></div>
        </Row>
        <Row className="jukeboxTemplate__know no-gutters justify-content-center justify-content-lg-start align-items-center">
          <Col lg="10" className="jukeboxTemplate_img01">
            <img
              src={img01}
              alt="Cheese"
              className="img-fluid"
              data-aos="fade-right"
              data-aos-anchor-placement="top-center"
            />
          </Col>
          <div className="w-100 d-none d-md-block"></div>
          <Col
            xs="10"
            lg={{ span: 5, offset: 1 }}
            className={`jukeboxTemplate__knowBox ${
              pageLang === "gcc" ? "rtl text-right" : ""
            }`}
            data-aos="fade-up"
            data-aos-anchor-placement="top-center"
          >
            <div className="jukeboxTemplate__title">
              <img
                src={Title01}
                className="img-fluid "
                alt="Know your cheese"
                data-aos="fade-up"
                data-aos-anchor-placement="top-center"
                data-aos-delay="200"
              />
              <p
                className={`general__subtitle light ${
                  pageLang === "gcc" ? "rtl text-right" : ""
                }`}
                data-aos="fade-up"
                data-aos-anchor-placement="top-center"
                data-aos-delay="200"
              >
                {subtitle1}
              </p>
            </div>

            <div
              data-aos="fade"
              data-aos-anchor-placement="top-center"
              data-aos-delay="500"
            >
              {translate && transIndex === 1 ? textJukeboxtr : textJukebox}              

            </div>
          </Col>
          <Col
            lg={{ span: 4, offset: 1 }}
            className="jukeboxTemplate__img02 d-none d-lg-block align-middle text-center"
          >
            <img
              src={img02}
              alt="Cheese"
              className="img-fluid"
              data-aos="fade-left"
              data-aos-anchor-placement="top-center"
              data-aos-delay="700"
            />
          </Col>
        </Row>
      </Container>
      <YourRecipe
        urlVideo={recipe_video}
        btnOn={true}
        titleOn={true}
        subtitle={subtitle2}
        url={recipe_link}
        type={"queso"}
      />
      <Related slides={related} title={related_title} type={"queso"} />
      <CallOut texts={callout} type={"jukebox"} />
      <Footer />
    </Fragment>
  );
};

export default JukeboxTemplatePage;
