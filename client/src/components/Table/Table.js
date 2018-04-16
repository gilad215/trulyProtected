import React from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import 'react-table/react-table.css';
import styled from 'styled-components';

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: []
    };
    this.statusDictionary = {};
    this.osDictionary = {};
  }

  componentDidMount() {
    fetch(this.props.dictionaryURL)
      .then(results => results.json())
      .then(data => {
        data.status.forEach(element => {
          this.statusDictionary[element.id] = element.name;
        });
        data.os.forEach(element => {
          this.osDictionary[element.id] = element.name;
        });
      });

    fetch(this.props.url)
      .then(results => results.json())
      .then(data => {
        const joinedData = data;
        data.forEach(element => {
          if (this.statusDictionary[element.status] !== null)
            element.status = this.statusDictionary[element.status];
          else element.status = 'NA';
          if (this.osDictionary[element.os] !== null)
            element.os = this.osDictionary[element.os];
          else element.os = 'NA';
        });
        this.setState({ tableData: joinedData });
      });
  }

  StyledTable = styled(ReactTable)`
    height: 700px;
    text-align: center;
  `;

  columns = [
    {
      Header: 'ID',
      accessor: 'id'
    },
    {
      Header: 'Hostname',
      accessor: 'hostname'
    },
    {
      Header: 'IP',
      accessor: 'ip'
    },
    {
      Header: 'MAC',
      accessor: 'mac'
    },
    {
      Header: 'Status',
      accessor: 'status'
    },
    {
      Header: 'OS',
      accessor: 'os'
    }
  ];

  updateTable = element => {
    const dataToUpdate = this.state.tableData;
    element.forEach(data => {
      const row = {
        hostname: data.hostname
      };
      dataToUpdate.push(row);
    });
    this.setState({ tableData: dataToUpdate });
    console.log('tableData now:', this.state.tableData);
  };

  render() {
    return (
      <this.StyledTable
        className="-highlight"
        data={this.state.tableData}
        columns={this.columns}
        filterable
      />
    );
  }
}

Table.propTypes = {
  url: PropTypes.string.isRequired,
  dictionaryURL: PropTypes.string.isRequired
};

export default Table;
