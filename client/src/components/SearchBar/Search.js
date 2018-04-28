import React from 'react';
import PropTypes from 'prop-types';
import Search from 'grommet/components/Search';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  handleChange = event => {
    this.setState({ value: event.target.value }, () => {
      this.props.search(this.state.value);
    });
  };

  resetSearch = () => {
    this.props.search('');
  };

  render() {
    return (
      <Search
        placeHolder="Search"
        inline
        value={this.state.value}
        onDOMChange={this.handleChange}
      />
    );
  }
}

SearchBar.propTypes = {
  search: PropTypes.func.isRequired
};

export default SearchBar;
