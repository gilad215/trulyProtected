import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import React from 'react';
import SimpleLineIcon from 'react-simple-line-icons';

const Toggle = ({ hasUnreadMessages, onClick }) => {
  const iconType = hasUnreadMessages ? (
    <SimpleLineIcon name="bell" />
  ) : (
    <SimpleLineIcon name="clock" />
  );
  const tooltip = <Tooltip id="tooltip">Notifications</Tooltip>;

  return (
    <OverlayTrigger
      placement="bottom"
      id="notifications-toggle-icon"
      overlay={tooltip}
    >
      <span onClick={onClick}>{iconType}</span>
    </OverlayTrigger>
  );
};

Toggle.propTypes = {
  hasUnreadMessages: PropTypes.bool.isRequired,
  onClick: PropTypes.func
};

Toggle.defaultProps = {
  onClick: null
};

export default Toggle;
