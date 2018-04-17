/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
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
                  placeholder={this.props.data.original.hostname}
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
              <Button color="primary" onClick={this.toggleNested}>
                CONFIRM
              </Button>{' '}
              <Button color="secondary" onClick={this.toggleAll}>
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

export default DetailsModal;
