import React from "react";

export default function Wrapper(props) {
  return <div className={"wrapper " + props.className}>{props.children}</div>;
}
