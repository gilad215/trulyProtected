import React from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import 'react-table/react-table.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import StatusIcon from '../Icons/StatusIcon';

class DetailsTable extends React.Component {
  columns = [
    {
      Header: 'Date',
      width: 200,
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
      accessor: 'user',
      width: 100
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
    },
    {
      Header: 'Email',
      width: 55,
      accessor: 'email',
      Cell: row => (
        <Button
          outline
          block
          color="primary"
          size="sm"
          onClick={() => window.open(`mailto:${row.value}`)}
        >
          Mail
        </Button>
      )
    }
  ];

  render() {
    return (
      <ReactTable
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
