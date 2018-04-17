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
  Input
} from 'reactstrap';

class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <div>
        <Button
          color="success"
          onClick={this.toggle}
          style={{ marginBottom: '5px' }}
        >
          ADD
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Add a Machine</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="examplehostname">Hostname</Label>
                <Input
                  type="name"
                  name="hostname"
                  id="examplehostname"
                  placeholder="Enter Hostname"
                  value={this.props.welcomeValue}
                  onChange={this.props.handlehostnameChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">Select Status</Label>
                <Input type="select" name="selectStatus" id="selectStatus">
                  {this.props.statuses.map((status, i) => (
                    <option key={i}>{status}</option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">Select OS</Label>
                <Input type="select" name="selectOS" id="exampleSelectOS">
                  {this.props.os.map((os, i) => <option key={i}>{os}</option>)}
                </Input>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.toggle}>
              ADD
            </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>
              CANCEL
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddModal;
