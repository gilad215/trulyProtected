import React from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import 'react-table/react-table.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import StatusIcon from '../Icons/StatusIcon';

class DetailsTable extends React.Component {
  StyledTable = styled(ReactTable)`
    border-radius: 8px;
  `;

  columns = [
    {
      Header: 'Date',
      minWidth: 120,
      accessor: 'time',
      Cell: row => (
        <span>
          {new Date(row.value).toLocaleDateString()}
          {' • '}
          {new Date(row.value).toLocaleTimeString()}
        </span>
      )
    },
    {
      Header: 'User',
      accessor: 'user'
    },
    {
      Header: 'Severity',
      width: 90,
      accessor: 'severityId',
      Cell: row => {
        let type;
        switch (row.value) {
          default:
            type = 'ok';
            break;
          case 'Info':
            type = 'ok';
            break;
          case 'Critical':
            type = 'critical';
            break;
          case 'High':
            type = 'warning';
            break;
          case 'Low':
            type = 'disabled';
            break;
          case 'Medium':
            type = 'warning';
            break;
        }
        return (
          <span>
            <StatusIcon
              type={type}
              desc={row.value.toString()}
              rowId={row.index}
            />
          </span>
        );
      }
    },
    {
      Header: 'Message',
      accessor: 'logMessage'
    }
  ];

  render() {
    return (
      <this.StyledTable
        className="-highlight"
        data={this.props.tableData}
        columns={this.columns}
        defaultPageSize={5}
        showPageSizeOptions={false}
      />
    );
  }
}

DetailsTable.propTypes = {
  tableData: PropTypes.array.isRequired
};

export default DetailsTable;
