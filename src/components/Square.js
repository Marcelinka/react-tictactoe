import React from "react";

export default function Square(props) {
  return (
    <button
      className={props.isHighlighted ? "square square_highlighted" : "square"}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
