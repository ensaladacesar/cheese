import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const CallOut = ({ texts, type }) => {
  const [state, setState] = useState(false);
  useEffect(() => {
    if (texts) {
      setState(true);
    }
    AOS.init({
      easing: "ease-in-out",
    });
    AOS.refresh();
  }, [texts]);

  return (
    <Container fluid className="p-0">
      <Row className="justify-content-center callOut__main no-gutters">
        <Col lg="7" className="pt-4">
          {state ? (
            <h4
              className="text-center"
              data-aos="fade"
              data-aos-anchor-placement="top-center"
            >
              {texts[0].callout_text}
            </h4>
          ) : null}
        </Col>
        <div className="w-100 d-none d-md-block m-4"></div>
        <Col lg="12" className="text-center pb-4">
          {state ? (
            type === "jukebox" ? (
              <Link
                to={"/cheeseslovers"}
                className="btn general__empty__button"
                data-aos="fade"
                data-aos-anchor-placement="top-center"
              >
                {texts[0].callout_button}
              </Link>
            ) : (
              <a
                className="btn general__empty__button"
                rel="noopener noreferrer"
                href={texts[0].callout_download}
                target="_blank"
              >
                {texts[0].callout_button}
              </a>
            )
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default CallOut;
