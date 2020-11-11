import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenuAction, openMenuAction } from "../../actions/menuActions";
import LogoCheese from "../../img/LogoCheeseUsa.svg";
import MenuIcon from "../../img/MenuIcon.svg";
import CloseMenu from "../../img/Close.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const dispatch = useDispatch();
  const openmenu = () => {
    document.getElementById("root").style.overflow = "hidden";
    dispatch(openMenuAction());
  };
  const closemenu = () => {
    document.getElementById("root").style.overflow = "initial";
    dispatch(closeMenuAction());
  };
  const menuOpened = useSelector((state) => state.Menu.openmenu);

  return (
    <Fragment>
      <motion.div
        className="header__logo"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ease: "easeIn", duration: 0.5, delay: 2 }}
      >
        <Link to={"/jukebox"} onClick={() => closemenu()} className="btn">
          <img src={LogoCheese} className="img-fluid" alt="USA Cheese" />
        </Link>
      </motion.div>
      <motion.div
        className="header__menu"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ease: "easeIn", duration: 0.5, delay: 2 }}
      >
        <motion.div layout>
          {!menuOpened && (
            <motion.div layout>
              <button
                type="button"
                className={`btn header__open animate__animated ${
                  !menuOpened ? "animate__zoomIn" : "animate__zoomOut"
                }`}
                onClick={() => openmenu()}
              >
                <img src={MenuIcon} alt="Menu" />
              </button>
            </motion.div>
          )}
          {menuOpened && (
            <motion.div layout>
              <button
                type="button"
                className={`btn header__close animate__animated ${
                  menuOpened ? "animate__zoomIn" : ""
                }`}
                onClick={() => closemenu()}
              >
                <img src={CloseMenu} className="img-fluid" alt="Cerrar Menu" />
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </Fragment>
  );
};

export default Header;
