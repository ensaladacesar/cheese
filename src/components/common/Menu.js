import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeMenuAction, getMenuAction } from "../../actions/menuActions";
import { NavLink, Link } from "react-router-dom";
import SocialLegal from "./SocialLegal";
import { motion, AnimatePresence } from "framer-motion";
import { Col } from "react-bootstrap";
import BgBorder from "../../img/menuBorder.svg";
import { getAboutAction } from "../../actions/storyAction";
import { getBuyAction } from "../../actions/loversActions";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
};

const Menu = () => {
  const dispatch = useDispatch();
  const pageLang = useSelector((state) => state.Languages.pagelanguage);
  const translate = useSelector((state) => state.Languages.translate);
  const transIndex = useSelector((state) => state.Languages.translateindex);
  const closemenu = () => {
    document.getElementById("root").style.overflow = "initial";
    dispatch(closeMenuAction());
  };
  const openMenu = useSelector((state) => state.Menu.openmenu);

  useEffect(() => {
    const loadMenu = () => dispatch(getMenuAction(pageLang, translate, transIndex));
    loadMenu();
    //eslint-disable-next-line
  }, []);

  const menu = useSelector((state) => state.Menu.mainmenu);

  const { jukebox, matchmaker, story, recipes, where_to, about, social } = menu;

  const gotToAbout = () => {
    dispatch( getAboutAction());
    closemenu();
  }

  const goToBuy = () => {
    dispatch( getBuyAction());
    closemenu();
  }

  const menuDiv = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`menu__main`}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="list-group text-center"
      >
        <motion.div variants={item} whileHover={{ scale: 1.05 }}>
          <NavLink
            exact
            to={"/jukebox"}
            onClick={() => closemenu()}
            className="list-group-item list-group-item-action  menu__special"
          >
            <p>{jukebox}</p>
            <img
              src={BgBorder}
              className="img-fluid menu__border"
              alt="border"
            />
          </NavLink>
        </motion.div>
        <motion.div variants={item} whileHover={{ scale: 1.05 }}>
          <NavLink
            exact
            to={"/cheesematchmaker"}
            onClick={() => closemenu()}
            className="list-group-item list-group-item-action  menu__special"
          >
            <p>{matchmaker}</p>
            <img
              src={BgBorder}
              className="img-fluid menu__border"
              alt="border"
            />
          </NavLink>
        </motion.div>
        <motion.div variants={item} whileHover={{ scale: 1.05 }}>
          <NavLink
            exact
            to={"/cheesestory"}
            onClick={() => closemenu()}
            className="list-group-item list-group-item-action  menu__special"
          >
            <p>{story}</p>
            <img
              src={BgBorder}
              className="img-fluid menu__border"
              alt="border"
            />
          </NavLink>
        </motion.div>
        <motion.div variants={item} whileHover={{ scale: 1.05 }}>
          <NavLink
            exact
            to={"/allrecipes"}
            onClick={() => closemenu()}
            className="list-group-item list-group-item-action menu__normal"
          >
            <p>{recipes}</p>
            <img
              src={BgBorder}
              className="img-fluid img-normal menu__border"
              alt="border"
            />
          </NavLink>
        </motion.div>
        <motion.div variants={item} whileHover={{ scale: 1.05 }}>
          <NavLink
            exact
            to={"/cheeseslovers"}
            onClick={() => goToBuy()}
            className="list-group-item list-group-item-action menu__normal"
          >
            <p>{where_to}</p>
            <img
              src={BgBorder}
              className="img-fluid img-normal menu__border"
              alt="border"
            />
          </NavLink>
        </motion.div>
        <motion.div variants={item} whileHover={{ scale: 1.05 }}>
          <Link
            to={"/cheesestory"}
            onClick={() => gotToAbout()}
            className="list-group-item list-group-item-action menu__normal"
          >
            <p>{about}</p>
            <img
              src={BgBorder}
              className="img-fluid img-normal menu__border"
              alt="border"
            />
          </Link>
        </motion.div>
      </motion.div>
      <Col lg="4">
        <SocialLegal social={social} fClass={false} />
      </Col>
    </motion.div>
  );

  return (
    <Fragment>
      <AnimatePresence initial={false}>{openMenu && menuDiv}</AnimatePresence>
    </Fragment>
  );
};

export default Menu;
