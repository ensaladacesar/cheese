import React, { Fragment, useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import YouTube from "react-youtube";
import { closeAboutAction, getStoryAction } from "../actions/storyAction";
import { useDispatch, useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
// import TitleStory from "../img/title_cheesestory.svg";
import TitleAbout from "../img/title_about.svg";
import HelmetMetaData from "./common/HelmetMetaData";
import Loading from "./common/Loading";

const CheeseStoryPage = () => {
  const dispatch = useDispatch();
  const scroll = useRef();
  const pageLang = useSelector((state) => state.Languages.pagelanguage);
  const translate = useSelector((state) => state.Languages.translate);
  const transIndex = useSelector((state) => state.Languages.translateindex);
  const pageCountry = useSelector((state) => state.Languages.country);
  const about = useSelector((state) => state.Story.about);
  const loading = useSelector((state) => state.Story.loading);

  useEffect(() => {
    const loadStory = () =>
      dispatch(getStoryAction(pageLang, translate, transIndex));
    loadStory();
    AOS.init({
      easing: "ease-in-out",
    });
    AOS.refresh();
    if(about){
      setTimeout(() => {
        scroll.current.scrollIntoView({ behavior: "smooth" });
        dispatch(closeAboutAction());        
      }, 1000);
      clearTimeout();
    }   
    //eslint-disable-next-line
  }, []);

  const story = useSelector((state) => state.Story.story);

  const { video, story_text, subtitle1, link_text, link } = story;

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      rel: 0,
      loop: 1,
      showinfo: 0,
      modestbranding: 0,
      fs: 0,
      iv_load_policy: 3,
    },
  };

  return (
    <Fragment>
      <HelmetMetaData title={`Cheese Story-${pageCountry}`} />
      {loading ? <Loading /> : null}
      <Container
        fluid
        className="p-0 story__container animate__animated animate__fadeIn animate__slower"
      >
        <Row className="no-gutters">
          <Col>
            <YouTube
              videoId={video}
              opts={opts}
              className="story__video"
              containerClassName="story__containerVideo"
            />
          </Col>
        </Row>
        <Row className="no-gutters">
          <Col>
            <span className="story_textVideo">Select video footage courtesy of the Dairy Farmers of Wisconsin and Dairy West.</span>
          </Col>
        </Row>
        <Row
          ref={scroll}
          className="story__about no-gutters justify-content-center"
        >
          <Col
            lg="12"
            className="text-center col-8 story__titleAbout"
            data-aos="fade-up"
            data-aos-anchor-placement="top-center"
          >
            <img
              src={TitleAbout}
              className="img-fluid"
              alt="About the USA Cheese Guild"
            />
            <p className="general__subtitle light mt-2 ml-n5">{subtitle1}</p>
          </Col>
        </Row>
        <Row className="story__about no-gutters">
          <Col
            lg={{ span: 3 }}
            className="story__aboutText"
            data-aos="fade-right"
          ></Col>
          <Col
            lg={{ span: 7 }}
            className={`story__aboutText p-4 col-10 d-flex align-items-center ${
              pageLang === "gcc" ? "rtl text-right" : ""
            }`}
            data-aos="fade-right"
          >
            <p data-aos="fade" data-aos-delay="300">
              {story_text}{" "}
              {link === "" ? null : (
                <a
                  className="story__link"
                  rel="noopener noreferrer"
                  href={link}
                  target="_blank"
                >
                  {link_text}
                </a>
              )}
              .
            </p>
          </Col>
          <Col
            className="story__pleca__derecha col-1"
            data-aos="fade-right"
          ></Col>
          <div className="w-100 d-block my-4"></div>
        </Row>
      </Container>
    </Fragment>
  );
};

export default CheeseStoryPage;
