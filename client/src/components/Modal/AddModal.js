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
      modal: false,
      statusDictionary: [],
      osDictionary: [],
      hostname: '',
      status: 'Down',
      os: 'Windows'
    };
  }

  componentWillMount() {
    this.getDictionary('http://localhost:5000/getdictionary');
  }
  getDictionary = async dictionaryURL => {
    await fetch(dictionaryURL)
      .then(results => results.json())
      .then(data => {
        this.setState({ statusDictionary: data.status.slice() });
        this.setState({ osDictionary: data.os.slice() });
      });
  };

  handleChange = event => {
    if (
      this.state.osDictionary.filter(
        element => element.name === event.target.value
      ).length === 0
    )
      this.setState({ status: event.target.value });
    else this.setState({ os: event.target.value });
  };

  handleHostnameChange = event => {
    this.setState({ hostname: event.target.value });
  };

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
                  onChange={this.handleHostnameChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">Select Status</Label>
                <Input
                  type="select"
                  name="selectStatus"
                  id="selectStatus"
                  value={this.state.status}
                  onChange={this.handleChange}
                >
                  {this.state.statusDictionary.map((status, i) => (
                    <option key={i}>{status.name}</option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">Select OS</Label>
                <Input
                  type="select"
                  name="selectOS"
                  id="exampleSelectOS"
                  value={this.state.os}
                  onChange={this.handleChange}
                >
                  {this.state.osDictionary.map((os, i) => (
                    <option key={i}>{os.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              onClick={() =>
                this.props.handleAdd(
                  this.state.hostname,
                  this.state.status,
                  this.state.os
                )
              }
            >
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
