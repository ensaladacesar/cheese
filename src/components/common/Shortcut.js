import React from "react";
import { NavLink } from "react-router-dom";
import { OverlayTrigger } from "react-bootstrap";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delay:3,
      staggerChildren:1.6
    }
  }
};

const item = {
  hidden: {
    opacity: 0    
  },
  show: {
    opacity: 1  
  },
};

const Shortcut = () => {
  return (
    <div className="shortcut__main d-none d-lg-block animate__animated animate__fadeIn">
      <motion.div
        className="list-group"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <OverlayTrigger
            placement="left"
            overlay={
              <div className="shortcut_tooltip" id={`tooltip-jukebox`}>
                USA Cheese Jukebox
              </div>
            }
          >
            <NavLink
              exact
              to={"/jukebox"}
              className="list-group-item list-group-item-action shortcut__dot"
            />
          </OverlayTrigger>
        </motion.div>
        <motion.div variants={item}>
          <OverlayTrigger
            placement="left"
            overlay={
              <div className="shortcut_tooltip" id={`tooltip-matchmaker`}>
                Cheese Matchmaker
              </div>
            }
          >
            <NavLink
              exact
              to={"/cheesematchmaker"}
              className="list-group-item list-group-item-action shortcut__dot"
            />
          </OverlayTrigger>
        </motion.div>
        <motion.div variants={item}>
          <OverlayTrigger
            placement="left"
            overlay={
              <div className="shortcut_tooltip" id={`tooltip-story`}>
                A Cheese Story
              </div>
            }
          >
            <NavLink
              exact
              to={"/cheesestory"}
              className="list-group-item list-group-item-action shortcut__dot"
            />
          </OverlayTrigger>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Shortcut;
