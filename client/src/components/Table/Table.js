import React from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import 'react-table/react-table.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import DetailsModal from '../Modal/DetailsModal';
import StatusIcon from '../Icons/StatusIcon';

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showRowInfo: {}
    };
    this.handler = React.createRef();
  }

  onRowClick = (state, rowInfo, column) => ({
    onClick: (e, handleOriginal) => {
      this.setState(
        {
          showRowInfo: rowInfo
        },
        () => this.toggleDataModal()
      );
    }
  });

  toggleDataModal = () => {
    this.handler.current.toggle();
  };

  StyledTable = styled(ReactTable)`
    border-radius: 8px;
  `;

  columns = [
    {
      Header: 'ID',
      accessor: 'id'
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: row => {
        let type;
        switch (row.value) {
          default:
            type = 'ok';
            break;
          case 'Protected':
            type = 'ok';
            break;
          case 'Down':
            type = 'critical';
            break;
          case 'Maintenance':
            type = 'warning';
            break;
          case 'Up':
            type = 'disabled';
            break;
        }
        return (
          <span>
            <StatusIcon type={type} desc={row.value} rowId={row.index} />
          </span>
        );
      }
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
      Header: 'OS',
      accessor: 'os'
    }
  ];

  render() {
    return (
      <div>
        <this.StyledTable
          className="-highlight"
          data={this.props.tableData}
          columns={this.columns}
          defaultPageSize={10}
          getTrProps={this.onRowClick}
        />
        {this.state.showRowInfo.row !== undefined && (
          <DetailsModal
            id={this.state.showRowInfo.row.id}
            toggle={this.toggleDataModal}
            handleDelete={this.props.handleDelete}
            dictionaryURL="http://localhost:5000/getSeverities"
            dataURL="http://localhost:5000/logs"
            ref={this.handler}
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
