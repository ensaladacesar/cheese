import React, { Fragment, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getRecipeAction } from "../actions/allrecipesActions";
import AOS from "aos";
import "aos/dist/aos.css";
// components
import YourRecipe from "../components/common/YourRecipe";
import CallOut from "../components/common/CallOut";
import Footer from "../components/common/Footer";
import Related from "../components/common/Related";
import { FacebookShareButton } from "react-share";
//imgs
import Facebook from "../img/facebook_icon.svg";
import TitleRecipe from "../img/title_recipe.svg";
import TitlePreparation from "../img/title_preparation.svg";
import HelmetMetaData from "./common/HelmetMetaData";
import { share } from "../data/share";
import { recipeTable } from "../data/recipeTable";
import Loading from "./common/Loading";

const RecipePage = () => {
  const dispatch = useDispatch();
  // const location = useLocation();
  const pageLang = useSelector((state) => state.Languages.pagelanguage);
  const pageCountry = useSelector((state) => state.Languages.country);
  const { id } = useParams();
  const recipeData = useSelector((state) => state.AllRecipes.recipe);
  const loading = useSelector((state) => state.AllRecipes.loading);
  const translate = useSelector((state) => state.Languages.translate);
  const transIndex = useSelector((state) => state.Languages.translateindex);

  // console.log(location.pathname);
  // console.log(id);
  const [state, setState] = useState({
    title_preparation_time: "",
    title_cooking_time: "",
    title_total_time: "",
    title_difficulty: "",
    title_servings: "",
    title_ingredient: "",
    title_quantity: "",
    title_units: "",
  });

  useEffect(() => {
    // const loadRecipes = () => dispatch(getAllRecipesAction(pageLang));
    // loadRecipes();
    const loadRecipe = () =>
      dispatch(getRecipeAction(pageLang, id, translate, transIndex));
    loadRecipe();
    if (id !== recipeData.id) {
      // console.log('si es diferente');
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }, 500);
      clearTimeout();
    }
    AOS.init({
      easing: "ease-in-out",
    });
    AOS.refresh();

    if (translate) {
      recipeTable.map((rT) => {
        if (rT.table_lang === "eng") {
          const {
            table_preparation_time,
            table_cooking_time,
            table_total_time,
            table_difficulty,
            table_servings,
            table_ingredient,
            table_quantity,
            table_units,
          } = rT;

          setState({
            title_preparation_time: table_preparation_time,
            title_cooking_time: table_cooking_time,
            title_total_time: table_total_time,
            title_difficulty: table_difficulty,
            title_servings: table_servings,
            title_ingredient: table_ingredient,
            title_quantity: table_quantity,
            title_units: table_units,
          });
        }
        return console.log("titles");
      });
    } else {
      recipeTable.map((rT) => {
        if (rT.table_lang === pageLang) {
          const {
            table_preparation_time,
            table_cooking_time,
            table_total_time,
            table_difficulty,
            table_servings,
            table_ingredient,
            table_quantity,
            table_units,
          } = rT;

          setState({
            title_preparation_time: table_preparation_time,
            title_cooking_time: table_cooking_time,
            title_total_time: table_total_time,
            title_difficulty: table_difficulty,
            title_servings: table_servings,
            title_ingredient: table_ingredient,
            title_quantity: table_quantity,
            title_units: table_units,
          });
        }
        return console.log("titles");
      });
    }
    //eslint-disable-next-line
  }, [id]);
  // console.log(recipe)

  const {
    title,
    img,
    video,
    description,
    subtitle1,
    subtitle2,
    preparation_time,
    cooking_time,
    total_time,
    difficulty,
    servings,
    ingredients,
    preparation,
    callout,
    related_title,
    related,
  } = recipeData;

  // // // si no hay receta en el state redireccionar a recetas
  if (ingredients === undefined) return null;
  // if (ingredients === undefined || recipe === null) return <Redirect to="/allrecipes" />;
  const {
    title_preparation_time,
    title_cooking_time,
    title_total_time,
    title_difficulty,
    title_servings,
    title_ingredient,
    title_quantity,
    title_units,
  } = state;

  return (
    <Fragment>
      <HelmetMetaData title={`Recipe-${pageCountry}-${id}`} />
      {loading ? <Loading /> : null}
      <Container fluid className="p-0 animate__animated animate__fadeIn">
        <Row
          className="recipe__main no-gutters justify-content-center"
          style={{ backgroundImage: `url(${img})` }}
        >
          <Col
            lg="6"
            className="text-center recipe__title col-10 animate__animated animate__fadeInDown animate__delay-1s"
          >
            {title}
          </Col>
          <Col sm="10" className="text-center recipe__sharebtn">
            {translate && transIndex === 1 ? (
              <FacebookShareButton
                className="general__facebookShare animate__animated animate__fadeIn animate__delay-1s"
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
                className="general__facebookShare animate__animated animate__fadeIn animate__delay-1s"
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
        </Row>
      </Container>
      <YourRecipe urlVideo={video} btnOn={false} titleOn={false} />
      <div className="w-100 d-md-block py-3 recipe__space"></div>
      <Container fluid className="p-0 animate__animated animate__fadeIn">
        <Row className="justify-content-center recipe__recipe no-gutters">
          <Col lg="3" className="text-center col-8 recipe__titleRecipe">
            <img
              src={TitleRecipe}
              className="img-fluid"
              alt="Recipe"
              data-aos="fade-up"
              data-aos-anchor-placement="top-center"
            />
            <p
              className="general__subtitle dark "
              data-aos="fade-up"
              data-aos-anchor-placement="top-center"
            >
              {subtitle1}
            </p>
          </Col>
          <div className="w-100 d-none d-md-block"></div>
          <Col
            lg="6"
            className={`col-10 recipe__des ${
              pageLang === "gcc" ? "rtl text-right" : ""
            }`}
          >
            <p
              data-aos="fade"
              data-aos-anchor-placement="top-center"
              data-aos-delay="200"
            >
              {description}
            </p>
          </Col>
          <Col lg="8" className="col-10">
            <Row
              className="no-gutters"
              data-aos="fade"
              data-aos-anchor-placement="top-center"
              data-aos-delay="200"
            >
              <Col className="text-center recipe__pre col">
                <p>
                  <strong>{title_preparation_time}</strong>
                  <br></br>
                  {preparation_time}
                </p>
              </Col>
              <div className="w-100 d-block d-lg-none"></div>
              <Col className="text-center recipe__pre col">
                <p>
                  <strong>{title_cooking_time}</strong>
                  <br></br>
                  {cooking_time}
                </p>
              </Col>
              <div className="w-100 d-block d-lg-none"></div>
              <Col className="text-center recipe__pre col">
                <p>
                  <strong>{title_total_time}</strong>
                  <br></br>
                  {total_time}
                </p>
              </Col>
              <div className="w-100 d-block d-lg-none"></div>
              <Col className="text-center recipe__pre col">
                <p>
                  <strong>{title_difficulty}</strong>
                  <br></br>
                  {difficulty}
                </p>
              </Col>
              <div className="w-100 d-block d-lg-none"></div>
              <Col className="text-center recipe__pre col">
                <p>
                  <strong>{title_servings}</strong>
                  <br></br>
                  {servings}
                </p>
              </Col>
            </Row>
            {/* <div className="w-100 d-md-block"></div> */}
            <Row
              className="no-gutters"
              data-aos="fade"
              data-aos-anchor-placement="top-center"
              data-aos-delay="300"
            >
              <Col>
                <table
                  className={`table table-bordered recipe__table ${
                    pageLang === "gcc" ? "rtl text-right" : ""
                  }`}
                >
                  <thead>
                    <tr>
                      <th scope="col" className="recipe__tableQH ">
                        {title_quantity}
                      </th>
                      <th scope="col" className="recipe__tableUH ">
                        {title_units}
                      </th>
                      <th scope="col" className="recipe__tableIH ">
                        {title_ingredient}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredients.map((ing, index) => (
                      <tr key={index}>
                        <th className="recipe__tableQ">{ing.quantity}</th>
                        <td className="recipe__tableU">{ing.units}</td>
                        <td className="recipe__tableI">{ing.ingredient}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="justify-content-center recipe__preparation py-4 no-gutters">
          <Col lg="3" className="col-8 recipe__titlePre text-center">
            <img
              src={TitlePreparation}
              className="img-fluid"
              alt="Preparation"
              data-aos="fade-up"
              data-aos-anchor-placement="top-center"
            />
            <p
              className="general__subtitle light "
              data-aos="fade-up"
              data-aos-anchor-placement="top-center"
            >
              {subtitle2}
            </p>
          </Col>
          <div className="w-100 d-none d-md-block"></div>
          <Col
            lg="8"
            className={`col-10 recipe__prepa ${
              pageLang === "gcc" ? "rtl text-right" : ""
            }`}
          >
            <p
              data-aos="fade"
              data-aos-anchor-placement="top-center"
              data-aos-delay="200"
            >
              {preparation}
            </p>
          </Col>
          <Col
            lg="8"
            className={`col-10 ${pageLang === "gcc" ? "rtl text-right" : ""}`}
          >
            {translate && transIndex === 1 ? (
              <FacebookShareButton
                className="general__facebookShare animate__animated animate__fadeIn animate__delay-1s"
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
                className="general__facebookShare animate__animated animate__fadeIn animate__delay-1s"
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
        </Row>
      </Container>
      <CallOut texts={callout} type={"recipe"} />
      <Related slides={related} title={related_title} type={"receta"} />
      <Footer />
    </Fragment>
  );
};

export default RecipePage;
