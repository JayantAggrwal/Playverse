import React from "react";
import { Link } from "react-router-dom";

import "./ActionLink.css";

function ActionLink(props) {
  const { children, className, reach } = props;
  const classes = "action_link " + className;
  return (
    <Link className={classes} to={reach}>
      {children}
    </Link>
  );
}

export default ActionLink;
