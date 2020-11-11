import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuizResultAction, postQuizAction } from "../actions/quizActions";
import AOS from "aos";
import "aos/dist/aos.css";
import { FacebookShareButton } from "react-share";
import YourRecipe from "../components/common/YourRecipe";
import Related from "../components/common/Related";
import CallOut from "../components/common/CallOut";
import Footer from "../components/common/Footer";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import HelmetMetaData from "./common/HelmetMetaData";
// import Portada from "../img/portada_main.svg";
import Facebook from "../img/facebook_icon.svg";
import TitlePersonality from "../img/title_personality.svg";
import TitleYourCheese from "../img/title_yourcheese.svg";
import { share } from "../data/share";
import Loading from "./common/Loading";

const QuizResultPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const pageLang = useSelector((state) => state.Languages.pagelanguage);
  const pageCountry = useSelector((state) => state.Languages.country);
  const translate = useSelector((state) => state.Languages.translate);
  const transIndex = useSelector((state) => state.Languages.translateindex);
  const quizS = useSelector((state) => state.Quiz.quizservice);
  const loading = useSelector((state) => state.Quiz.loading);
  //eslint-disable-next-line
  const [pstQuiz, setPstQuiz] = useState({
    country: pageCountry,
    cheese: quizS,
  });

  useEffect(() => {
    const loadQuizResult = () =>
      dispatch(getQuizResultAction(quizS, pageLang, translate, transIndex));
    loadQuizResult();
    if (quizS === "") {
      // console.log('quiz s', quizS);
      history.replace("/cheesematchmaker");
    }

    AOS.init({
      easing: "ease-in-out",
    });
    AOS.refresh();
    // console.log(`pais: ${pageCountry}, queso: ${quizS}`);
    dispatch(postQuizAction(pstQuiz));

    //eslint-disable-next-line
  }, []);

  const quizResult = useSelector((state) => state.Quiz.quizresult);

  const {
    header_text,
    title,
    subtitle1,
    subtitle2,
    subtitle3,
    img01,
    personality,
    your_cheese,
    recipe_video,
    related_title,
    related,
    callout,
  } = quizResult;

  return (
    <Fragment>
      <HelmetMetaData title={`Your Cheese-${pageCountry}`} />
      {loading ? <Loading /> : null}
      <Container fluid className="p-0 animate__animated animate__fadeIn">
        <Row className="quizResult__main no-gutters justify-content-center justify-content-lg-start">
          <Col
            lg="5"
            className="text-right quizResult__header col-10 d-flex align-items-end flex-row-reverse animate__animated animate__fadeInDown animate__delay-1s"
          >
            {header_text}
          </Col>
          <Col className="col-1 quizResult__pleca__der animate__animated animate__fadeInDown animate__delay-1s"></Col>
          <div className="w-100 d-none d-md-block mt-5"></div>
          <Col
            lg={{ span: 5, offset: 2 }}
            className="order-2 order-lg-2 col-10"
          >
            <img
              src={img01}
              className="img-fluid animate__animated animate__zoomIn"
              alt="Cover"
            />
          </Col>
          <Col
            lg="4"
            className="order-1 order-lg-2 col-10 quizResult__title animate__animated animate__zoomIn animate__delay-1s"
          >
            {title}
          </Col>
        </Row>
        <Row className="quizResult__personality no-gutters justify-content-center justify-content-lg-start">
          <Col className="text-right col-10 quizResult__share animate__animated animate__fadeIn animate__delay-1s">
            {translate && transIndex === 1 ? (
              <FacebookShareButton
                className="general__facebookShare"
                url={"https://www.usacheeseexperience.com/"}
                openShareDialogOnClick={true}
              >
                {share.map((sh) =>
                  "eng" === sh.share_lang ? sh.share_text : null
                )}{" "}
                <img src={Facebook} alt="Share on Facebook" />
              </FacebookShareButton>
            ) : (
              <FacebookShareButton
                className="general__facebookShare"
                url={"https://www.usacheeseexperience.com/"}
                openShareDialogOnClick={true}
              >
                {share.map((sh) =>
                  pageLang === sh.share_lang ? sh.share_text : null
                )}{" "}
                <img src={Facebook} alt="Share on Facebook" />
              </FacebookShareButton>
            )}
          </Col>
          <div className="w-100 d-block my-5"></div>
          <Col
            className="col-2 quizResult__pleca_per_l offset-lg-5"
            data-aos="fade-left"
            data-aos-anchor-placement="top-center"
          ></Col>
          <Col
            lg="5"
            className="quizResult__personalityb col-10"
            data-aos="fade-left"
            data-aos-anchor-placement="top-center"
          >
            <img
              src={TitlePersonality}
              className="img-fluid"
              alt="Cover"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-anchor-placement="top-center"
            />
            <p
              className={`general__subtitle light mt-n4`}
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-anchor-placement="top-center"
            >
              {subtitle1}
            </p>
            <p
              className={`text-right ${
                pageLang === "gcc" ? "rtl text-right" : ""
              }`}
              data-aos="fade"
              data-aos-anchor-placement="top-center"
              data-aos-delay="600"
            >
              {personality}
            </p>
          </Col>
          <div className="w-100 d-block my-5 my-lg-2"></div>
          <Col
            lg="5"
            className="quizResult__yourCheese col-10"
            data-aos="fade-right"
            data-aos-anchor-placement="top-center"
          >
            <img
              src={TitleYourCheese}
              className="img-fluid"
              alt="Cover"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-anchor-placement="top-center"
            />
            <p
              className="general__subtitle light mt-n4"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-anchor-placement="top-center"
            >
              {subtitle2}
            </p>
            <p
              className={`${pageLang === "gcc" ? "rtl text-right" : ""}`}
              data-aos="fade"
              data-aos-anchor-placement="top-center"
              data-aos-delay="600"
            >
              {your_cheese}
            </p>
          </Col>
          <Col
            className="col-2 quizResult__pleca_per_r"
            data-aos="fade-right"
            data-aos-anchor-placement="top-center"
          ></Col>
          <div className="w-100 d-block mb-5"></div>
        </Row>
      </Container>
      <YourRecipe urlVideo={recipe_video} titleOn={true} subtitle={subtitle3} />
      <Related slides={related} title={related_title} type={"queso"} />
      <CallOut texts={callout} type={'jukebox'} />
      <Footer />
    </Fragment>
  );
};

export default QuizResultPage;
