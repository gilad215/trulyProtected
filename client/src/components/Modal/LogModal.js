/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Row } from 'reactstrap';
import Dialog from 'material-ui/Dialog';
import LogTable from '../Table/LogTable';

class LogModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      tableData: []
    };
  }

  componentWillMount() {
    this.fetchLogs(this.props.url);
  }

  fetchLogs = async url => {
    await fetch(this.props.url)
      .then(results => results.json())
      .then(data => {
        this.setState({ tableData: data });
      });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    const actions = [
      <Button color="secondary" onClick={this.toggle}>
        CLOSE
      </Button>
    ];
    return (
      <Dialog
        title="Activity Log"
        actions={actions}
        modal={false}
        open={this.state.modal}
        onRequestClose={this.toggle}
        autoDetectWindowHeight
        autoScrollBodyContent
        repositionOnUpdate
        contentStyle={{ width: 'auto', maxWidth: 'none' }}
      >
        <Row>
          <LogTable tableData={this.state.tableData} />
        </Row>
      </Dialog>
    );
  }
}

export default LogModal;
