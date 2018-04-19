import React from 'react';
import Proptypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Col
} from 'reactstrap';

class DetailsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      nestedModal: false,
      closeAll: false
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
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  };

  toggleAll = () => {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    });
  };

  render() {
    console.log('data:', this.props.data);
    return (
      <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
        className={this.props.className}
      >
        <ModalHeader toggle={this.toggle}>Details</ModalHeader>
        <ModalBody>
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
          <Modal
            isOpen={this.state.nestedModal}
            toggle={this.toggleNested}
            onClosed={this.state.closeAll ? this.toggle : undefined}
          >
            <ModalHeader>Confirm</ModalHeader>
            <ModalBody>Are you sure you want to delete this machine?</ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                onClick={() => this.handleDelete(this.props.data.row.id)}
              >
                DELETE
              </Button>{' '}
              <Button color="secondary" onClick={this.toggleNested}>
                CANCEL
              </Button>
            </ModalFooter>
          </Modal>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.toggleNested}>
            DELETE
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

DetailsModal.propTypes = {
  data: Proptypes.object.isRequired,
  toggle: Proptypes.func.isRequired,
  className: Proptypes.string,
  handleDelete: Proptypes.func.isRequired
};

DetailsModal.defaultProps = {
  className: 'null'
};

export default DetailsModal;
