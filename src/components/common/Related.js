import React, { useState, useRef, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import { useHistory } from "react-router-dom";
import { selectCheeseAction } from "../../actions/jukeboxActions";
// import Related01 from "../../img/related_01.svg";
// import Related02 from "../../img/related_02.svg";
// import Related03 from "../../img/related_03.svg";

const Related = ({ slides, title, type }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const rslick = useRef(Slider);
  const [state, setState] = useState(false);

  useEffect(() => {
    if (slides && title) {
      setState(true);
    }
    AOS.init({
      easing: "ease-in-out",
    });
    AOS.refresh();
    //eslint-disable-next-line
  }, [slides, title]);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 3,
    speed: 500,
    dots: true,
    responsive: [
      {
        breakpoint: 767,
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

  const goToRecipe = (item) => {
    type === "queso" ? goToJukebox(item) : history.replace(`/recipe/${item}`);
  };

  const goToJukebox = (cheese) => {
    dispatch(selectCheeseAction(cheese));
    setTimeout(() => {
      history.replace(`/jukeboxCheese/${cheese}`);
      // window.scrollTo(0, 0);
    }, 100);
    clearTimeout();
  };

  return (
    <Container fluid className="p-0">
      <Row className="justify-content-center related__main no-gutters">
        <Col
          lg="12"
          className="text-center col-10"
          data-aos="fade"
          data-aos-anchor-placement="top-center"
        >
          <p>{title}</p>
        </Col>
        <Col
          className="col-10 pb-5"
          data-aos="fade"
          data-aos-anchor-placement="top-center"
        >
          {state ? (
            <Slider {...settings} ref={rslick}>
              {slides.map((slide, index) => (
                <button
                  type="button"
                  key={index}
                  className="related__button"
                  onClick={() => goToRecipe(slide.link)}
                >
                  <div
                    key={index}
                    className="d-flex justify-content-center align-items-center related__slide"
                  >
                    {/* <div className="related__title">
                    <h5>{slide.title}</h5>
                  </div> */}
                    <div className="related__img">
                      <img
                        src={slide.img}
                        className="img-fluid"
                        alt={slide.title}
                      />
                    </div>
                  </div>
                </button>
              ))}
            </Slider>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default Related;
