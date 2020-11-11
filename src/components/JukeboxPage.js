import React, { useRef, useEffect, useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sign from "./common/Sign";
import { Col, Container, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import { getLanguagesAction } from "../actions/languagesActions";
import {
  getJukeboxAction,
  selectCheeseAction,
} from "../actions/jukeboxActions";
import ReactAudioPlayer from "react-audio-player";
//images
// import Portada from "../img/jukebox01.jpg";
import Der from "../img/Der.svg";
import Izq from "../img/Izq.svg";
import Derh from "../img/Derh.svg";
import Izqh from "../img/Izqh.svg";
import SwiperCore, { Navigation, EffectCoverflow, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import HelmetMetaData from "./common/HelmetMetaData";
import Loading from "./common/Loading";
SwiperCore.use([Navigation, EffectCoverflow, EffectFade]);

const JukeboxPage = () => {
  const dispatch = useDispatch();
  const s1 = useRef();
  const s2 = useRef();
  const history = useHistory();
  const pageLang = useSelector((state) => state.Languages.pagelanguage);
  const pageCountry = useSelector((state) => state.Languages.country);
  const loading = useSelector((state) => state.Jukebox.loading);
  const translate = useSelector((state) => state.Languages.translate);
  const transIndex = useSelector((state) => state.Languages.translateindex);

  const [loadCover, setloadCover] = useState(false);
  const [urlAudio, setUrlAudio] = useState("");

  useEffect(() => {
    const loadLang = () => dispatch(getLanguagesAction());
    loadLang();
    const loadJukeboxes = () =>
      dispatch(getJukeboxAction(pageLang, translate, transIndex));
    loadJukeboxes();
    //eslint-disable-next-line
  }, [translate, transIndex]);
  const jukeboxData = useSelector((state) => state.Jukebox.jukebox);
  // const texts = useSelector((state) => state.Jukebox.jukeboxtext);
  const { jukebox, texts } = jukeboxData;

  const getCheese = () => {
    jukebox.map((juke, index) => {
      if (s1.current.swiper.activeIndex === index) {
        dispatch(selectCheeseAction(juke.nameid));
        history.push(`/jukeboxCheese/${juke.nameid}`);
      }
      return console.log("jukebox cheese");
    });
    // s1.current.swiper.activeIndex === index ? (
    //     <>
    //       console.log(juke)
    //       {/* dispatch(selectCheeseAction(juke)); history.push(`/jukeboxCheese/$
    //       {juke.nameid}`); */}
    //     </>
    //   ) : null
    //   );
  };

  if (jukebox === undefined) return null;
  setTimeout(() => {
    if (!loadCover) {
      setloadCover(true);
      // playSound();
    }
  }, 1500);
  clearTimeout();

  const playSound = () => {
    jukebox.map((juke, index) =>
      s1.current.swiper.activeIndex === index ? setUrlAudio(juke.mp3) : null
    );
  };

  return (
    <Fragment>
      <HelmetMetaData title={`Jukebox-${pageCountry}`} />
      {loading ? <Loading /> : null}
      <Container
        fluid
        className="p-0 jukebox__main animate__animated animate__fadeIn"
      >
        <Row className="justify-content-center align-items-center no-gutters h-100">
          <Col>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeIn", duration: 0.5, delay: 1.3 }}
            >
              <Row className="justify-content-center no-gutters pt-2">
                <Col sm={6} className="text-center">
                  <Sign signText={texts[0].p} sClass={true} />
                  {/* <Sign signText={texts.p} sClass={true} /> */}
                </Col>
              </Row>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeIn", duration: 0.5, delay: 1 }}
            >
              <Row className="no-gutters justify-content-center align-items-center">
                <Col
                  lg="5"
                  className="align-items-center d-flex col-10 jukebox__swiperCover"
                >
                  {loadCover ? (
                    <Fragment>
                      <Swiper
                        ref={s1}
                        spaceBetween={0}
                        slidesPerView={2}
                        navigation={{
                          nextEl: ".der",
                          prevEl: ".izq",
                        }}
                        loop={false}
                        initialSlide={2}
                        preventClicks={false}
                        preventClicksPropagation={false}
                        centeredSlides={true}
                        effect="coverflow"
                        coverflowEffect={{
                          rotate: 70,
                          stretch: 0,
                          depth: 50,
                          slideShadows: true,
                          modifier: 1,
                        }}
                        breakpoints={{
                          768: {
                            slidesPerView: 3,
                            coverflowEffect: {
                              rotate: 50,
                              stretch: 150,
                              depth: 180,
                              slideShadows: true,
                              modifier: 0.5,
                            },
                          },
                        }}
                        onInit={() => {
                          playSound();                          
                        }}
                        onSlideChange={(swiper) => {
                          setTimeout(() => {
                            s2.current.swiper.slideTo(swiper.activeIndex);
                          }, 100);
                          clearTimeout();
                        }}
                      >
                        {jukebox.map((juke, index) => (
                          <SwiperSlide key={index}>
                            {/* <input
                            readOnly
                            className="jukebox__audio"
                            hidden
                            value={juke.mp3}
                          /> */}
                            <img
                              src={juke.img}
                              className="img-fluid jukebox__img"
                              alt={juke.img}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      <button
                        className="btn jukebox__arrows izq"
                        onClick={() => playSound()}
                      >
                        <img
                          src={Izq}
                          onMouseOver={(e) => (e.currentTarget.src = Izqh)}
                          onMouseOut={(e) => (e.currentTarget.src = Izq)}
                          className="img-fluid"
                          alt="Arrow"
                        />
                      </button>
                      <button
                        className="btn jukebox__arrows der"
                        onClick={() => playSound()}
                      >
                        <img
                          src={Der}
                          onMouseOver={(e) => (e.currentTarget.src = Derh)}
                          onMouseOut={(e) => (e.currentTarget.src = Der)}
                          className="img-fluid"
                          alt="Arrow"
                        />
                      </button>
                    </Fragment>
                  ) : null}
                </Col>
              </Row>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeIn", duration: 0.5, delay: 1.5 }}
            >
              <Row className="no-gutters justify-content-center align-items-center">
                <Col className="text-center align-self-center col-10 col-lg-5">
                  {loadCover ? (
                    <Fragment>
                      <ReactAudioPlayer
                        src={urlAudio}
                        autoPlay
                        controls
                        loop={true}
                        className="invisible"
                      />
                      <Swiper
                        effect="fade"
                        ref={s2}
                        preventClicks={false}
                        loop={false}
                        preventClicksPropagation={false}
                        allowTouchMove={false}
                        fadeEffect={{
                          crossFade: true,
                        }}
                      >
                        {jukebox.map((juke, index) => (
                          <SwiperSlide key={index}>
                            <div className="jukebox__msg">
                              <Sign signText={juke.msg} sClass={false} />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      {/* /media/cc0-audio/t-rex-roar.mp3 */}
                    </Fragment>
                  ) : null}
                </Col>
                <Col sm="12" className="text-center">
                  <button
                    type="button"
                    className="btn general__fill__button"
                    onClick={() => getCheese()}
                  >
                    {texts[0].button}
                  </button>
                </Col>
              </Row>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default JukeboxPage;
