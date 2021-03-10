import React from 'react';
import PropTypes from 'prop-types';

function Square(props) {
  return (
    <button
      type="button"
      className={props.isHighlighted ? 'square square_highlighted' : 'square'}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

Square.propTypes = {
  isHighlighted: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default Square;
