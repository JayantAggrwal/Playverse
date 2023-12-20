import React from "react";
import "./ActionIcon.css";

function ActionIcon(props) {
  const { children, className, handleClick, style: iconStyle } = props;

  const classes =   className + " action_icon";

  return (
    <button
      className={classes}
      onClick={handleClick}
      style={{ ...iconStyle }}
    >
      {children}
    </button>
  );
}

export default ActionIcon;
