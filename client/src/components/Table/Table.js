import React from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import 'react-table/react-table.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import DetailsModal from '../Modal/DetailsModal';

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      statusDictionary: {},
      osDictionary: {},
      showRowBool: false,
      showRowInfo: {}
    };
  }

  componentDidMount() {
    this.fetchData(this.props.url, this.props.dictionaryURL);
  }

  onRowClick = (state, rowInfo, column) => ({
    onClick: (e, handleOriginal) => {
      console.log('row clicked!');
      console.log('show?', this.state.showRowBool);
      this.setState({
        showRowBool: !this.state.showRowBool,
        showRowInfo: rowInfo
      });
    }
  });

  toggleDataModal = () => {
    this.setState({
      showRowBool: !this.state.showRowBool
    });
  };

  fetchData = async (dataURL, dictionaryURL) => {
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

    fetch(dataURL)
      .then(results => results.json())
      .then(data => {
        const joinedData = data;
        joinedData.forEach(element => {
          if (this.state.statusDictionary[element.status] !== undefined)
            element.status = this.state.statusDictionary[element.status];
          else element.status = 'N/A';
          if (this.state.osDictionary[element.os] !== undefined)
            element.os = this.state.osDictionary[element.os];
          else element.os = 'N/A';
        });
        this.setState({ tableData: joinedData });
      });
  };

  StyledTable = styled(ReactTable)`
    height: 700px;
    text-align: center;
  `;

  styleRows = (state, rowInfo, column, instance) => {
    if (rowInfo && rowInfo.row) {
      let color;
      switch (rowInfo.row.status) {
        default:
          color = null;
          break;
        case 'Protected':
          color = '#00800030';
          break;
        case 'Down':
          color = '#ff000030';
          break;
        case 'Maintenance':
          color = '#ffaa0045';
          break;
      }
      return {
        style: {
          background: color
        }
      };
    }
    return {};
  };

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

  updateTable = () => {
    this.fetchData(this.props.url, this.props.dictionaryURL);
  };

  render() {
    return (
      <div>
        <this.StyledTable
          className="-highlight -striped"
          data={this.state.tableData}
          columns={this.columns}
          filterable
          getTrProps={this.onRowClick}
          getTdProps={this.styleRows}
        />
        {this.state.showRowBool && (
          <DetailsModal
            data={this.state.showRowInfo}
            toggle={this.toggleDataModal}
            updateTable={this.updateTable}
          />
        )}
      </div>
    );
  }
}

Table.propTypes = {
  url: PropTypes.string.isRequired,
  dictionaryURL: PropTypes.string.isRequired
};

export default Table;
