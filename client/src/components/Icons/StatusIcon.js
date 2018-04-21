import React from 'react';
import PropTypes from 'prop-types';
import Status from 'grommet/components/icons/Status';

class StatusIcon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tooltipOpen: false
    };
  }

  toggle = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  };

  render() {
    return (
      <span style={{ textAlign: 'left' }}>
        <Status
          value={this.props.type}
          style={{ height: '15px', width: '15px' }}
          id={`icon${this.props.rowId}`}
        />{' '}
        {this.props.desc}
      </span>
    );
  }
}

StatusIcon.propTypes = {
  type: PropTypes.string.isRequired,
  rowId: PropTypes.number.isRequired,
  desc: PropTypes.string
};

StatusIcon.defaultProps = {
  desc: ''
};

export default StatusIcon;
