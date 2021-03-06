import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Col } from 'react-bootstrap';
import { Alert } from 'reactstrap';
import Table from './Table';
import AddModal from '../Modal/AddModal';
import LogModal from '../Modal/LogModal';

class TableContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      filteredData: [],
      isSearching: false,
      statusDictionary: {},
      osDictionary: {},
      showAlert: false
    };
    this.modalRef = React.createRef();
    this.logRef = React.createRef();
  }

  componentDidMount() {
    this.getDictionary(this.props.dictionaryURL);
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

  getTable = () => {
    if (this.state.isSearching) return this.state.filteredData;
    return this.state.tableData;
  };

  handleDelete = id => {
    axios
      .delete(`http://localhost:3000/delete/${id}`)
      .then(response => {
        if (response.status === 200) {
          this.props.handleAlert('delsuccess');
          this.fetchData(this.props.url, this.props.dictionaryURL);
        }
      })
      .catch(error => {
        this.props.handleAlert('danger');
      });
  };

  handleLogs = () => {
    this.logRef.current.toggle();
  };

  handleSearch = value => {
    if (value !== '') {
      this.setState({ isSearching: true });
      const filteredData = [];
      this.state.tableData.forEach(row => {
        const values = Object.values(row);
        for (let i = 0; i < values.length; i++) {
          if (typeof values[i] === 'string' && values[i].indexOf(value) > -1) {
            filteredData.push(row);
            break;
          }
          if (
            typeof values[i] === 'number' &&
            values[i].toString().indexOf(value) > -1
          ) {
            filteredData.push(row);
            break;
          }
        }
      });
      this.setState({ filteredData });
    } else {
      this.setState({ isSearching: false });
    }
  };

  deployAdd = () => {
    this.modalRef.current.toggle();
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
          this.props.handleAlert('addsuccess');
          this.fetchData(this.props.url, this.props.dictionaryURL);
        }
      })
      .catch(error => {
        this.props.handleAlert('danger');
      });
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
    this.setState({ tableData: joinedData }, () => {
      this.props.updateCharts(this.state.tableData);
    });
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
        <LogModal url="http://localhost:5000/logs" ref={this.logRef} />

        <Table
          tableData={this.getTable()}
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
  dictionaryURL: PropTypes.string.isRequired,
  handleAlert: PropTypes.func.isRequired,
  updateCharts: PropTypes.func.isRequired
};

export default TableContainer;
