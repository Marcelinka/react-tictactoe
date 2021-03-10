import React from 'react';
import PropTypes from 'prop-types';

function Wrapper(props) {
  return <div className={`wrapper ${props.className}`}>{props.children}</div>;
}

Wrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
