import React from 'react';
import Proptypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class DetailsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      nestedModal: false
    };
  }

  handleDelete = id => {
    this.props.handleDelete(id);
    this.toggleAll();
  };

  toggle = () => {
    this.props.toggle();
  };

  toggleNested = () => {
    this.setState({
      nestedModal: !this.state.nestedModal
    });
  };

  toggleAll = () => {
    this.setState({
      nestedModal: !this.state.nestedModal,
      modal: !this.state.modal
    });
  };

  render() {
    const actions = [
      <Button color="danger" onClick={this.toggleNested}>
        DELETE
      </Button>,
      ' ',
      <Button color="secondary" onClick={this.toggle}>
        EXIT
      </Button>
    ];
    const nestedActions = [
      <Button
        color="danger"
        onClick={() => this.handleDelete(this.props.data.row.id)}
      >
        DELETE
      </Button>,
      ' ',
      <Button color="secondary" onClick={this.toggleNested}>
        CANCEL
      </Button>
    ];
    return (
      <MuiThemeProvider>
        <Dialog
          title="DETAILS"
          actions={actions}
          modal={false}
          open={this.state.modal}
          onRequestClose={this.toggle}
        >
          <Form>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>
                Hostname
              </Label>
              <Col sm={10}>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder={this.props.data.row.hostname}
                  readOnly
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>
                IP
              </Label>
              <Col sm={10}>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder={this.props.data.row.ip}
                  readOnly
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>
                Status
              </Label>
              <Col sm={10}>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder={this.props.data.row.status}
                  readOnly
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>
                OS
              </Label>
              <Col sm={10}>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder={this.props.data.row.os}
                  readOnly
                />
              </Col>
            </FormGroup>
          </Form>
          <Dialog
            title="Confirm Delete"
            actions={nestedActions}
            modal
            open={this.state.nestedModal}
            onRequestClose={this.toggleNested}
          />
        </Dialog>
      </MuiThemeProvider>
    );
  }
}

DetailsModal.propTypes = {
  data: Proptypes.object.isRequired,
  toggle: Proptypes.func.isRequired,
  handleDelete: Proptypes.func.isRequired
};

export default DetailsModal;
