import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

const NavAlert = props => (
  <Alert
    color={props.alertType}
    isOpen={props.showAlert}
    toggle={() => props.toggleAlert()}
    style={{
      maxHeight: '38px',
      marginBottom: '0px',
      marginRight: '5px'
    }}
  >
    {props.alertText}
  </Alert>
);

NavAlert.propTypes = {
  alertText: PropTypes.string,
  alertType: PropTypes.string.isRequired,
  showAlert: PropTypes.bool.isRequired,
  toggleAlert: PropTypes.func.isRequired
};

NavAlert.defaultProps = {
  alertText: ''
};

export default NavAlert;
