import React, { useState, useEffect, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import AOS from "aos";
import "aos/dist/aos.css";
// imgs
import TitleRecipe from "../../img/jukebox_template_recipe.svg";
import { fullRecipe } from "../../data/fullRecipe";

const YourRecipe = ({ urlVideo, btnOn, titleOn, subtitle, url }) => {
  const [state, setState] = useState(false);
  const pageLang = useSelector((state) => state.Languages.pagelanguage);
  const translate = useSelector((state) => state.Languages.translate);
  const transIndex = useSelector((state) => state.Languages.translateindex);

  useEffect(() => {
    if (urlVideo) {
      setState(true);
    }
    AOS.init({
      easing: "ease-in-out",
    });
    AOS.refresh();
  }, [urlVideo]);

  // console.log(urlVideo);
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      controls: 1,
      disablekb: 1,
      rel: 0,
      loop: 1,
      showinfo: 0,
      modestbranding: 0,
    },
  };

  const textButton = fullRecipe.map((fullbtn, index) =>
    pageLang === fullbtn.full_lang ? (
      <Fragment key={index}>{fullbtn.full_text}</Fragment>
    ) : null
  );

  const textButtontr = fullRecipe.map((fullbtn, index) =>
    'eng' === fullbtn.full_lang ? (
      <Fragment key={index}>{fullbtn.full_text}</Fragment>
    ) : null
  );

  return (
    <Container fluid className="p-0">
      <Row className="justify-content-center yourRecipe__main no-gutters">
        <Col lg="12" className="text-center col-8 py-3">
          {titleOn ? (
            <Fragment>
              <img
                src={TitleRecipe}
                alt="Cheese"
                className="img-fluid"
                data-aos="fade"
                data-aos-anchor-placement="top-center"
              />
              <p
                className="general__subtitle dark ml-n5"
                data-aos="fade"
                data-aos-anchor-placement="top-center"
              >
                {subtitle}
              </p>
            </Fragment>
          ) : null}
        </Col>
        <Col
          lg="8"
          className="col-10"
          data-aos="fade"
          data-aos-anchor-placement="top-center"
        >
          {state ? (
            <YouTube
              videoId={urlVideo}
              opts={opts}
              className="yourRecipe__video"
              containerClassName="yourRecipe_containerVideo"
            />
          ) : null}
        </Col>
        <div className="w-100 d-none d-md-block py-4"></div>

        <Col sm="12" className="text-center pb-4">
          {btnOn ? (
            <Link
              to={`/recipe/${url}`}
              className="btn general__fill__button my-4"
              data-aos="fade"
              data-aos-anchor-placement="center"
            >
              {translate && transIndex === 1 ? textButtontr : textButton}              
            </Link>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default YourRecipe;
