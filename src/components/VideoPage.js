import React, { Fragment, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { visibleMenuAction } from "../actions/menuActions";
import { getIntroSuccessAction } from "../actions/languagesActions";
// import YouTube from "react-youtube";
import { Player } from "video-react";
// images
import LogoCheese from "../img/LogoCheeseUsa.svg";
import { motion } from "framer-motion";
import IntroVideo from "../video/Intro.mp4";
import IntroMobile from "../video/introMobile.mp4";
import Portada from "../img/jukebox_bg.jpg";
import HelmetMetaData from "./common/HelmetMetaData";
import Loading from "./common/Loading";

const VideoPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const pageLang = useSelector((state) => state.Languages.pagelanguage);
  const pageCountry = useSelector((state) => state.Languages.country);
  const loading = useSelector((state) => state.Languages.loading);
  const translate = useSelector((state) => state.Languages.translate);
  const transIndex = useSelector((state) => state.Languages.translateindex);

  useEffect(() => {
    const menusOff = () => dispatch(visibleMenuAction(false));
    menusOff();
    const loadIntro = () =>
      dispatch(getIntroSuccessAction(translate, transIndex));
    loadIntro();
    //eslint-disable-next-line
  }, []);

  const introData = useSelector((state) => state.Languages.intro);

  // const opts = {
  //   height: "100%",
  //   width: "100%",
  //   playerVars: {
  //     // https://developers.google.com/youtube/player_parameters
  //     autoplay: 1,
  //     controls: 0,
  //     disablekb: 1,
  //     rel: 0,
  //     loop: 1,
  //     showinfo: 0,
  //     modestbranding: 0,
  //   },
  // };
  // const _onReady = (event) => {
  //   // access to player in all event handlers via event.target
  //   event.target.playVideo();
  // };

  const getVideoSrc = (width) => {
    if (width >= 992) return IntroVideo;
    if (width <= 768) return IntroMobile;
    return IntroVideo;
  };

  const src = getVideoSrc(window.innerWidth);

  const skipbtn = () => {
    dispatch(visibleMenuAction(true));
    history.replace("/jukebox");
  };

  return (
    <Fragment>
      <HelmetMetaData title={`Intro-${pageCountry}`}/>
      {loading ? <Loading /> : null}      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.5, delay: 0.5 }}
      >
        <Player
          poster={Portada}
          className="intro__video"
          autoPlay
          fluid
          playsInline={true}
          onEnded={() => skipbtn()}
        >
          <source src={src} />
        </Player>

        {/* <YouTube
          videoId="bTwuDmOhQ4o"
          opts={opts}
          onReady={_onReady}
          className="intro__video"
        /> */}
      </motion.div>
      <Container
        fluid
        className="p-0 intro__main animate__animated animate__fadeIn"
      >
        <Row className="p-0 justify-content-center">
          <Col sm="12" className="intro__logo text-center">
            <motion.img
              src={LogoCheese}
              className="img-fluid"
              alt="USA Cheese"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeIn", duration: 0.5, delay: 2 }}
            />
          </Col>
          <Col sm="12" className="intro__skip text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeIn", duration: 1, delay: 4 }}
            >
              <button
                className="btn general__empty__button"
                onClick={() => skipbtn()}
              >
                {translate
                  ? introData.map((btn) =>
                      "eng" === btn.lang ? btn.button_text : null
                    )
                  : introData.map((btn) =>
                      pageLang === btn.lang ? btn.button_text : null
                    )}
              </button>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default VideoPage;
