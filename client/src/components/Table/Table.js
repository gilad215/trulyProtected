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
      showRowBool: false,
      showRowInfo: {}
    };
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

  StyledTable = styled(ReactTable)`
    height: 570px;
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

  render() {
    return (
      <div>
        <this.StyledTable
          className="-highlight -striped"
          data={this.props.tableData}
          columns={this.columns}
          filterable
          getTrProps={this.onRowClick}
          getTdProps={this.styleRows}
        />
        {this.state.showRowBool && (
          <DetailsModal
            data={this.state.showRowInfo}
            toggle={this.toggleDataModal}
            handleDelete={this.props.handleDelete}
          />
        )}
      </div>
    );
  }
}

Table.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  tableData: PropTypes.array.isRequired
};

export default Table;
