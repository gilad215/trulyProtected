import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Col } from 'react-bootstrap';
import { Alert } from 'reactstrap';
import Table from './Table';
import AddModal from '../Modal/AddModal';

class TableContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      statusDictionary: {},
      osDictionary: {},
      showAlert: false
    };
    this.modalRef = React.createRef();
  }

  componentDidMount() {
    this.getDictionary(this.props.dictionaryURL);
    // setInterval(
    //   () => this.fetchData(this.props.url, this.props.dictionaryURL),
    //   3000
    // );
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
    await axios.get(dataURL).then(response => {
      joinedData = response.data;
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

  handleAdd = (hostname, status, os, ip, mac) => {
    const machine = {
      hostname,
      ip,
      mac,
      status,
      os
    };
    axios
      .post('http://localhost:3000/insert', machine)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            showAlert: true,
            alertText: `Added Machine Successfully`,
            alertType: 'success'
          });
          this.fetchData(this.props.url, this.props.dictionaryURL);
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          showAlert: true,
          alertText: `Error adding machine`,
          alertType: 'danger'
        });
      });
  };

  handleDelete = id => {
    axios
      .delete(`http://localhost:3000/delete/${id}`)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            showAlert: true,
            alertText: `Deleted Machine Successfully`,
            alertType: 'danger'
          });
          this.fetchData(this.props.url, this.props.dictionaryURL);
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          showAlert: true,
          alertText: `Error deleting machine`,
          alertType: 'danger'
        });
      });
  };

  deployAdd = () => {
    this.modalRef.current.toggle();
  };

  toggleAlert = () => {
    this.setState({ showAlert: false });
  };

  render() {
    return (
      <Col xs={12} md={12}>
        <Alert
          color={this.state.alertType}
          isOpen={this.state.showAlert}
          toggle={this.toggleAlert}
        >
          {this.state.alertText}
        </Alert>
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
