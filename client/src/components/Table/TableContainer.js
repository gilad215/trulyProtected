import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import Table from './Table';
import AddModal from '../Modal/AddModal';

class TableContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      statusDictionary: {},
      osDictionary: {}
    };
    this.modalRef = React.createRef();
  }

  componentDidMount() {
    this.getDictionary(this.props.dictionaryURL);
    setInterval(
      () => this.fetchData(this.props.url, this.props.dictionaryURL),
      3000
    );
  }

  getDictionary = async dictionaryURL => {
    await fetch(dictionaryURL)
      .then(results => results.json())
      .then(data => {
        data.status.forEach(element => {
          this.setState(prevstate => {
            prevstate.statusDictionary[element.id] = element.name;
          });
        });
        data.os.forEach(element => {
          this.setState(prevstate => {
            prevstate.osDictionary[element.id] = element.name;
          });
        });
      });
    this.fetchData(this.props.url, this.props.dictionaryURL);
  };

  fetchData = async (dataURL, dictionaryURL) => {
    let joinedData;
    await fetch(dataURL)
      .then(results => results.json())
      .then(data => {
        joinedData = data;
        joinedData.forEach(element => {
          if (this.state.statusDictionary[element.status] !== undefined)
            element.status = this.state.statusDictionary[element.status];
          else element.status = 'N/A';
          if (this.state.osDictionary[element.os] !== undefined)
            element.os = this.state.osDictionary[element.os];
          else element.os = 'N/A';
        });
      });
    this.setState({ tableData: joinedData });
  };

  handleAdd = async (hostname, status, os, ip, mac) => {
    const machine = {
      hostname,
      ip,
      mac,
      status,
      os
    };
    console.log('machine: ', JSON.stringify(machine));
    await fetch('http://localhost:3000/insert', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(machine)
    });
  };

  handleDelete = async id => {
    await fetch(`http://localhost:3000/delete/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
  };

  deployAdd = () => {
    this.modalRef.current.toggle();
  };

  render() {
    return (
      <Col xs={12} md={12}>
        <AddModal
          dictionaryURL="http://localhost:5000/getdictionary"
          handleAdd={this.handleAdd}
          ref={this.modalRef}
        />

        <Table
          tableData={this.state.tableData}
          url={this.props.url}
          dictionaryURL={this.props.dictionaryURL}
          handleDelete={this.handleDelete}
        />
      </Col>
    );
  }
}

TableContainer.propTypes = {
  url: PropTypes.string.isRequired,
  dictionaryURL: PropTypes.string.isRequired
};

export default TableContainer;
