import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLanguagesAction,
  changeLangAction,
  changeCountryAction,
} from "../actions/languagesActions";
import { visibleMenuAction } from "../actions/menuActions";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Der from "../img/Der.svg";
import Izq from "../img/Izq.svg";
import Derh from "../img/Derh.svg";
import Izqh from "../img/Izqh.svg";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SelectLanguage from "./common/SelectLanguage";
import HelmetMetaData from "./common/HelmetMetaData";
import Loading from "./common/Loading";
import LogoCheese from "../img/LogoCheeseUsa.svg";
SwiperCore.use([Navigation]);

// localStorage.removeItem('perState');

const LanguagePage = () => {
  const dispatch = useDispatch();
  const l1 = useRef();
  const langs = useSelector((state) => state.Languages.languages);
  const texts = useSelector((state) => state.Languages.langtext);
  const loading = useSelector((state) => state.Languages.loading);

  // const [country, setCountry] = useState('');
  const [value, setValue] = useState("");
  const [textBtn, setTextBtn] = useState({
    p: "",
    button: "",
  });

  // console.log('co', country);
  // console.log('vl', value);

  const [idiomaSelect, setIdiomaSelect] = useState({
    name1: "",
    valor: "",
  });
  // console.log(langs)

  useEffect(() => {
    const loadLang = () => dispatch(getLanguagesAction());
    loadLang();
    const menusOff = () => dispatch(visibleMenuAction(false));
    menusOff();

    //eslint-disable-next-line
  }, []);

  // console.log(langs.length);
  // console.log(texts);
  if (langs === []) return null;
  if (texts === undefined) return null;

  const getLanguage = () => {
    if (value === "") {
      setIdiomaSelect({
        name1: l1.current.swiper.visibleSlides[1].children[1].value,
        valor: l1.current.swiper.visibleSlides[1].children[2].value,
      });
      dispatch(changeLangAction(idiomaSelect.valor));
      dispatch(changeCountryAction(idiomaSelect.name1));
    } else {
      setIdiomaSelect({
        name1: l1.current.swiper.visibleSlides[1].children[1].value,
      });
      dispatch(changeLangAction(value));
      dispatch(changeCountryAction(idiomaSelect.name1));
      setValue("");
    }

    // console.log("pais", l1.current.swiper.visibleSlides[1].children[1].value);
    // console.log(
    //   "valor actual",
    //   l1.current.swiper.visibleSlides[1].children[2].value
    // );
    // console.log("estado de idioma select", idiomaSelect);
    // console.log("valor cambiado", value);
  };

  return (
    <Fragment>
      <HelmetMetaData title={"USA Cheese Experience"} />
      {loading ? <Loading /> : null}

      <motion.div
        className="header__logo"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ease: "easeIn", duration: 0.5, delay: 2 }}
      >
        <Link className="btn">
          <img src={LogoCheese} className="img-fluid" alt="USA Cheese" />
        </Link>
      </motion.div>

      <Container fluid className="animate__animated animate__fadeIn">
        <Row className="language__main justify-content-center">
          <Col lg="4" className="mt-5">
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeIn", duration: 0.5, delay: 0.5 }}
              className="text-center"
            >
              {/* {texts.p} */}
              {textBtn.p}
            </motion.p>
          </Col>

          <Col lg="12" className="p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeIn", duration: 0.5, delay: 0.5 }}
            >
              {langs.length > 1 ? (
                <Fragment>
                  <Swiper
                    ref={l1}
                    slidesPerView={3}
                    centeredSlides={true}
                    loop={true}
                    autoHeight
                    speed={500}
                    allowTouchMove={true}
                    navigation={{
                      nextEl: ".der",
                      prevEl: ".izq",
                    }}
                    breakpoints={{
                      769: {
                        slidesPerView: 3,
                        allowTouchMove: true,
                      },
                      1025: {
                        allowTouchMove: false,
                        slidesPerView: 3,
                      },
                    }}
                    onInit={(swiper) => {
                      swiper.update();
                      // console.log("swiper lang", swiper);
                      // setCountry(swiper.visibleSlides[1].children[0].textContent);
                      // setValue(swiper.visibleSlides[1].children[1].value);
                      setIdiomaSelect({
                        name1: swiper.visibleSlides[1].children[1].value,
                        valor: swiper.visibleSlides[1].children[2].value,
                      });
                      setTextBtn({
                        p: swiper.visibleSlides[1].children[4].value,
                        button: swiper.visibleSlides[1].children[5].value,
                      });
                      // console.log(
                      //   "swiper initialized",
                      //   swiper.visibleSlides[1].children[4].value,
                      //   swiper.visibleSlides[1].children[5].value
                      // );

                      // setTimeout(() => {
                      //   swiper.slideNext();
                      // }, 100);
                    }}
                    onSlideChange={(swiper) => {
                      // console.log(
                      //   "swiper lang",
                      //   swiper
                      // );
                      swiper.update();
                      // setCountry(swiper.visibleSlides[1].children[0].textContent);
                      // setValue(swiper.visibleSlides[1].children[2].value);
                      // console.log(
                      //   "swiper slide",
                      //   swiper.visibleSlides[1]
                      // );
                      setIdiomaSelect({
                        name1: swiper.visibleSlides[1].children[1].value,
                        valor: swiper.visibleSlides[1].children[2].value,
                      });
                      setTextBtn({
                        p: swiper.visibleSlides[1].children[4].value,
                        button: swiper.visibleSlides[1].children[5].value,
                      });
                      // console.log(
                      //   "swiper initialized",
                      //   swiper.visibleSlides[1].children[4].value,
                      //   swiper.visibleSlides[1].children[5].value
                      // );
                      // console.log(
                      //   "swiper slide valor",
                      //   swiper.visibleSlides[1].children[1].value
                      // );
                      // console.log(
                      //   "swiper slide pais",
                      //   swiper.visibleSlides[1].children[1].value
                      // );
                    }}
                  >
                    {langs.map((language, index) => (
                      <SwiperSlide key={index}>
                        <div className="language__idioma">
                          <h1>{language.country}</h1>
                          <SelectLanguage
                            select={language.select}
                            valor={idiomaSelect.valor}
                            setValue={setValue}
                          />
                        </div>
                        <input
                          readOnly
                          className="language__country"
                          hidden
                          value={language.country}
                        />
                        <input
                          readOnly
                          className="language__lang "
                          hidden
                          value={language.lang}
                        />

                        <div className="language__mapa">
                          <img src={language.map} alt={language.map} />
                        </div>
                        <input
                          readOnly
                          className="language__p"
                          hidden
                          value={language.p}
                        />
                        <input
                          readOnly
                          className="language__button"
                          hidden
                          value={language.button}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <button className="btn language__arrows izq">
                    <img
                      src={Izq}
                      onMouseOver={(e) => (e.currentTarget.src = Izqh)}
                      onMouseOut={(e) => (e.currentTarget.src = Izq)}
                      className="img-fluid"
                      alt="Arrow"
                    />
                  </button>
                  <button className="btn language__arrows der">
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
            </motion.div>
          </Col>

          <Col lg="4" className="text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeIn", duration: 0.5, delay: 1 }}
            >
              <Link
                to={"/intro"}
                className="btn general__empty__button"
                onClick={() => getLanguage()}
              >
                {/* {texts.button} */}
                {textBtn.button}
              </Link>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default LanguagePage;
