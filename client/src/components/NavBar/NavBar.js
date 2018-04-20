import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Navbar } from 'reactstrap';

const NanoNavbar = props => {
  const Stylednavbar = styled(Navbar)`
    border-bottom: 1px solid #e6e6e6;
    background: #fafbfc;
  `;
  return <Stylednavbar {...props}>{props.children}</Stylednavbar>;
};

NanoNavbar.propTypes = {
  children: PropTypes.node.isRequired
};

export default NanoNavbar;
