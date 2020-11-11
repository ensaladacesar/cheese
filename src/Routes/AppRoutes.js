import React, { Fragment } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
import LanguagePage from "../components/LanguagePage";
import VideoIntro from "../components/VideoPage";
import JukeboxPage from "../components/JukeboxPage";
import JukeboxTemplatePage from "../components/JukeboxTemplatePage";
import Menu from "../components/common/Menu";
import Header from "../components/common/Header";
import ExtraButtons from "../components/common/ExtraButtons";
import Shortcut from "../components/common/Shortcut";
import RecipePage from "../components/RecipePage";
import QuizResultPage from "../components/QuizResultPage";
import CheeseStoryPage from "../components/CheeseStoryPage";
import CheesesLoversPage from "../components/CheesesLoversPage";
import AllRecipesPage from "../components/AllRecipesPage";
import SayCheesePage from "../components/SayCheesePage";
import QuizPage from "../components/QuizPage";
import HelmetMetaData from "../components/common/HelmetMetaData";

const AppRoutes = () => {
  const location = useLocation();
  // const menus = useSelector((state) => state.Menu.menuvisible);
  // console.log(location.pathname)
  

  return (
    <Fragment>
      <HelmetMetaData />
      {location.pathname === "/" || location.pathname === "/intro" ? null : (
        <Menu />
      )}
      {location.pathname === "/" || location.pathname === "/intro" ? null : (
        <Shortcut />
      )}
      {location.pathname === "/" || location.pathname === "/intro" ? null : (
        <Header />
      )}
      <Switch>
        <Route path="/*/reload" component={null} />
        <Route exact path="/" component={LanguagePage} />
        <Route exact path="/intro" component={VideoIntro} />
        <Route exact path="/jukebox" component={JukeboxPage} />
        <Route
          exact
          path="/jukeboxCheese/:cheese"
          component={JukeboxTemplatePage}
        />
        <Route exact path="/recipe/:id" component={RecipePage} />
        <Route exact path="/quizresult" component={QuizResultPage} />
        <Route exact path="/cheesestory" component={CheeseStoryPage} />
        <Route exact path="/cheeseslovers" component={CheesesLoversPage} />
        <Route exact path="/allrecipes" component={AllRecipesPage} />
        <Route exact path="/saycheese" component={SayCheesePage} />
        <Route exact path="/cheesematchmaker" component={QuizPage} />
        <Redirect to="/" />
      </Switch>
      {location.pathname === "/" || location.pathname === "/intro" ? null : (
        <ExtraButtons />
      )}
    </Fragment>
  );
};

export default AppRoutes;
