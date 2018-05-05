import React from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import 'react-table/react-table.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';

class UserTable extends React.Component {
  columns = [
    {
      Header: 'User',
      accessor: 'user',
      width: 200
    },
    {
      Header: 'Last Login',
      width: 463,
      accessor: 'lastLogin',
      Cell: row => (
        <span>
          {new Date(row.value).toLocaleDateString()}
          {' • '}
          {new Date(row.value).toLocaleTimeString()}
        </span>
      )
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
        defaultSorted={[
          {
            id: 'lastLogin',
            desc: true
          }
        ]}
      />
    );
  }
}

UserTable.propTypes = {
  tableData: PropTypes.array.isRequired
};

export default UserTable;
