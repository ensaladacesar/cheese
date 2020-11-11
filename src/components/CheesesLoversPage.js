import React, {Fragment, useState, useEffect, useRef} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import HelmetMetaData from "./common/HelmetMetaData";
import {closeBuyAction, getLoversAction} from "../actions/loversActions";
import MapLovers from "./common/MapLovers";
import Sign from "./common/Sign";
import Footer from "./common/Footer";
import {FacebookShareButton} from "react-share";
import {motion} from "framer-motion";
import Arthur from "../img/arthur.svg";
import Girl from "../img/girl_eng.svg";
import Facebook from "../img/facebook_icon.svg";
import Loading from "./common/Loading";
import {share} from "../data/share";


const CheesesLoversPage = () => {
    const scroll = useRef();
    const dispatch = useDispatch();
    const rslick = useRef(Slider);
    const [show, setShow] = useState({
        on: false,
        id: "",
        list: [],
    });
    const [pick, setPick] = useState({
        value: "",
    });
    const pageLang = useSelector((state) => state.Languages.pagelanguage);
    const pageCountry = useSelector((state) => state.Languages.country);
    const loading = useSelector((state) => state.Lovers.loading);
    const buy = useSelector((state) => state.Lovers.buy);
    const translate = useSelector((state) => state.Languages.translate);
    const transIndex = useSelector((state) => state.Languages.translateindex);
    // console.log("idioma actual", pageLang);

    useEffect(() => {
        const loadJukeboxes = () =>
            dispatch(getLoversAction(pageLang, translate, transIndex));
        loadJukeboxes();
        AOS.init({
            easing: "ease-in-out",
        });
        AOS.refresh();
        if (buy) {
            setTimeout(() => {
                if (!!scroll.current) {
                    scroll.current.scrollIntoView({behavior: "smooth"});
                    dispatch(closeBuyAction());
                    clearTimeout();
                }
            }, 2000);
        }
        //eslint-disable-next-line
    }, []);

    const lovers = useSelector((state) => state.Lovers.lovers);
    const {
        header_text,
        country,
        cheeses,
        pick_text,
        button,
        brands,
        store_text,
        stores,
    } = lovers;

    const settings = {
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        speed: 500,
        dots: true,
        responsive: [
            {
                breakpoint: 769,
                centerMode: false,
                centerPadding: "0",
                dots: true,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    };

    const showCheeses = (store) => {
        setShow({
            on: true,
            id: store.id,
            list: store.cheeses,
        });
    };
    const hideCheeses = () => {
        setShow({
            on: false,
            id: "",
            list: [],
        });
    };

    const CheesesList = ({list}) => {
        return (
            <motion.div
                layout
                className="lovers__cheeses"
                onClick={() => hideCheeses()}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{ease: "easeInOut", duration: 0.3}}
            >
                <ul>
                    {list.map((cheese, index) => (
                        <li key={index}>{cheese}</li>
                    ))}
                </ul>
            </motion.div>
        );
    };

    const StoreLovers = () => {
        return (
            <Row className="lovers__stores no-gutters">
                <Col lg="1" className="d-none d-lg-block"></Col>
                <Col>
                    <Row className="row-cols-1 row-cols-lg-3 lovers__bg no-gutters">
                        {stores.map((store, index) => (
                            <Col className="lovers__bg" key={index}>
                                {show.on && show.id === store.id ? (
                                    <motion.div
                                        layout
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        exit={{opacity: 0}}
                                        transition={{ease: "easeInOut", duration: 0.3}}
                                    >
                                        <CheesesList list={show.list}/>
                                    </motion.div>
                                ) : null}
                                <div
                                    className="lovers__store"
                                    onClick={() => showCheeses(store)}
                                >
                                    <img
                                        src={store.store_logo}
                                        className="img-fluid"
                                        alt="Store"
                                    />
                                    <p>{store_text}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Col>
                <Col lg="1" className="d-none d-lg-block"></Col>
            </Row>
        );
    };

    const CheeseSlider = () => {
        return (
            <Row className="lovers__brands no-gutters justify-content-center">
                <Col lg="7" xl="8">
                    <Slider {...settings} ref={rslick} className="lovers__mainSlider">
                        {brands.map((brand, index) => (
                            <div
                                key={index}
                                className="d-flex justify-content-center align-items-center lovers__slide"
                            >
                                <div className="lovers__img">
                                    <img src={brand.img} className="img-fluid" alt={brand.img}/>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </Col>
            </Row>
        );
    };

    const handelSelect = (e) => {
        setPick({
            value: e.target.value,
        });
    };

    if (cheeses === undefined) return null;

    return (
        <Fragment>
            <HelmetMetaData title={`Cheese Lovers-${pageCountry}`}/>
            {loading ? <Loading/> : null}
            <Container fluid className="p-0 animate__animated animate__fadeIn">
                <Row className="lovers__main no-gutters justify-content-lg-center">
                    {header_text ? (
                        <Col
                            className="col-6 d-none d-lg-block text-center lovers__sign animate__animated animate__fadeIn  animate__delay-1s">
                            {pageLang === "eng" ? (
                                <Sign signText={"Hi there!"} sClass={false}/>
                            ) : (
                                <Sign signText={header_text} sClass={false}/>
                            )}
                        </Col>
                    ) : null}

                    <div className="w-100 d-none d-lg-block"></div>
                    <Col className="col-2 offset-md-2 lovers__pleca-izq animate__animated animate__fadeInDown"></Col>

                    <Col
                        md="8"
                        className="col-10 lovers__header animate__animated animate__fadeInDown"
                    >
                        {pageLang === "eng" ? (
                            <p className="lovers__country_eng">
                                Please choose any of our current participating countries to view
                                this section:
                            </p>
                        ) : (
                            <p className="lovers__country">{country}</p>
                        )}
                    </Col>

                    {pageLang === "eng" ? (
                        <Col lg={{span: 7}} className="col-10 lovers__girl text-center">
                            <img
                                src={Girl}
                                className="aling-middle animate__animated animate__fadeInLeft animate__delay-1s"
                                alt="Girl"
                            />
                        </Col>
                    ) : (
                        <>
                            <Col lg={{span: 2}} className="d-flex col-3 lovers__arthur">
                                <img
                                    src={Arthur}
                                    className="img-fluid aling-middle animate__animated animate__fadeInLeft animate__delay-1s"
                                    alt="Arthur"
                                />
                            </Col>
                            <Col
                                lg="4"
                                className="col-9 lovers__map animate__animated animate__fadeIn"
                            >
                                {/* componete de mapa */}
                                <MapLovers cheese={pick.value}/>
                            </Col>
                            <Col lg="2" className="lovers__select">
                                <Row className="no-gutters">
                                    <Col className="text-right animate__animated animate__fadeIn animate__delay-1s">
                                        <select
                                            name="cheeses"
                                            id="cheeses"
                                            className="lovers__selectUI"
                                            onChange={(e) => handelSelect(e)}
                                        >
                                            <option value="">-- Select --</option>
                                            {cheeses.map((cheese, index) => (
                                                <option key={index} value={cheese.name}>
                                                    {cheese.name}
                                                </option>
                                            ))}
                                        </select>
                                        <p className="lovers__pick animate__animated animate__fadeIn animate__delay-1s">
                                            {pick_text}
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="no-gutters">
                                    <Col className="text-right py-3">
                                        {cheeses.map((cheese, index) =>
                                            cheese.name === pick.value ? (
                                                <motion.div
                                                    key={index}
                                                    initial={{opacity: 0}}
                                                    animate={{opacity: 1}}
                                                    exit={{opacity: 0}}
                                                    transition={{ease: "easeIn", duration: 0.5}}
                                                >
                                                    <p className="lovers__number">{cheese.lovers}</p>
                                                    <p className="lovers__queso">{cheese.name} lovers</p>
                                                </motion.div>
                                            ) : null
                                        )}
                                    </Col>
                                </Row>
                                <Row className="no-gutters">
                                    <Col
                                        className="text-right lovers__share animate__animated animate__fadeIn animate__delay-1s">
                                        {translate && transIndex === 1 ? (
                                            <FacebookShareButton
                                                className="general__facebookShare"
                                                url={"https://www.usacheeseexperience.com/"}
                                                openShareDialogOnClick={true}
                                            >
                                                {share.map((sh) =>
                                                    "eng" === sh.share_lang ? sh.share_text : null
                                                )}{" "}
                                                <img src={Facebook} alt="Share on Facebook"/>
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
                                                <img src={Facebook} alt="Share on Facebook"/>
                                            </FacebookShareButton>
                                        )}
                                    </Col>
                                </Row>
                            </Col>
                        </>
                    )}
                    <div className="w-100 d-none d-lg-block"></div>
                    {pageLang === "eng" ? (
                        <Col lg="4" className="text-center d-lg-block my-5">
                            <Link to={"/"} className="btn general__fill__button">
                                Choose your country
                            </Link>
                        </Col>
                    ) : (
                        <Col lg="4" className="text-center d-lg-block my-5">
                            <button onClick={() => scroll.current.scrollIntoView({behavior: "smooth"})}
                                    className="btn general__fill__button">
                                {button}
                            </button>
                        </Col>
                    )}
                </Row>

                {pageLang === "esp" || pageLang === "eng" ? null : (
                    <motion.div
                        ref={scroll}
                        layout
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{ease: "easeIn", duration: 0.5}}
                    >
                        <StoreLovers/>
                    </motion.div>
                )}
                {pageLang === "jp" || pageLang === "eng" || pageLang === "ch" ? null : (
                    <motion.div
                        layout
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{ease: "easeIn", duration: 0.5}}
                    >
                        <CheeseSlider/>
                    </motion.div>
                )}
            </Container>
            <Footer/>
        </Fragment>
    );
};

export default CheesesLoversPage;
