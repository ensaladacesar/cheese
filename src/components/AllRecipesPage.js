import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import {
  getAllRecipesAction
} from "../actions/allrecipesActions";
import { motion } from "framer-motion";
import CallOut from "./common/CallOut";
import Footer from "./common/Footer";
import HelmetMetaData from "./common/HelmetMetaData";
// import Img from "../img/all_01.svg";
import Loading from "./common/Loading";


const containerR = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    },
  },
};

const itemR = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const AllRecipesPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const pageLang = useSelector((state) => state.Languages.pagelanguage);
  const pageCountry = useSelector((state) => state.Languages.country);
  const allRecipesData = useSelector((state) => state.AllRecipes.allrecipes);
  const loading = useSelector((state) => state.AllRecipes.loading);
  const translate = useSelector((state) => state.Languages.translate);
  const transIndex = useSelector((state) => state.Languages.translateindex);

  const { allreceipes, callout } = allRecipesData;

  useEffect(() => {
    const loadRecipes = () => dispatch(getAllRecipesAction(pageLang, translate, transIndex));
    loadRecipes();
    //eslint-disable-next-line
  }, []);

  const goToRecipe = (recipe) => {
    // dispatch(getRecipeAction(recipe));
    history.push(`/recipe/${recipe.id}`);
  };

  return (
    <Fragment>
      <HelmetMetaData title={`All Recipes-${pageCountry}`}/>
      {loading ? <Loading /> : null}      
      <Container fluid className="p-0 animate__animated animate__fadeIn">
        <Row className="all__main no-gutters">
          <Col
            lg={{ span: 1, offset: 6 }}
            className="col-2 pleca-izq animate__animated animate__fadeInDown"
          ></Col>
          <Col
            lg={{ span: 5 }}
            className="all__title col-10 animate__animated animate__fadeInDown"
          >
            all<br />recipes
          </Col>
          <Col lg={{ span: 10, offset: 1 }} className="my-3">
            <motion.div
              className="row no-gutters"
              variants={containerR}
              initial="hidden"
              animate="show"
            >
              {allreceipes
                ? allreceipes.map((recipe, index) => (
                    <motion.div
                      key={index}
                      variants={itemR}
                      className="col col-lg-4 all__recipe col-6 text-center"
                    >
                      <button type="button" onClick={() => goToRecipe(recipe)} className="all__button">
                        <p>{recipe.title}</p>
                        <img
                          src={recipe.thumb}
                          className="img-fluid"
                          alt="Recipe"
                        />
                      </button>
                    </motion.div>
                  ))
                : null}
            </motion.div>
          </Col>
        </Row>
      </Container>
      <CallOut texts={callout} type={'jukebox'} />
      <Footer />
    </Fragment>
  );
};

export default AllRecipesPage;
