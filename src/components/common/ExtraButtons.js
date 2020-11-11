import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import CheeseLovers from "../../img/CheesesWorldBtn.svg";
import SayCheese from "../../img/SayCheese.svg";
import { closeMenuAction } from "../../actions/menuActions";
import { motion } from "framer-motion";

const ExtraButtons = () => {
  const dispatch = useDispatch();
  const closemenu = () => {
    document.getElementById("root").style.overflow = "initial";
    dispatch(closeMenuAction());
  };

  return (
    <Fragment>
      <motion.div
        className="extra__cheeselovers "
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ease: "easeIn", duration: 0.5, delay: 2 }}
      >
        <Link to={"/cheeseslovers"} onClick={() => closemenu()}>
          <img src={CheeseLovers} className="img-fluid" alt="Cheese Lovers" />
        </Link>
      </motion.div>
      <motion.div
        className="extra__saycheese"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ease: "easeIn", duration: 0.5, delay: 2 }}
      >
        <Link to={"/saycheese"} onClick={() => closemenu()}>
          <img src={SayCheese} className="img-fluid" alt="Say Cheese!" />
        </Link>
      </motion.div>
    </Fragment>
  );
};

export default ExtraButtons;
