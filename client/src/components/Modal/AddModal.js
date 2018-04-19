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
      statusDictionary: {},
      osDictionary: {},
      hostname: '',
      status: 1,
      os: 1,
      ip: '1.1.1.2',
      mac: '4R:3A:5G:22'
    };
  }

  componentWillMount() {
    this.getDictionary('http://localhost:5000/getdictionary');
  }
  getDictionary = async dictionaryURL => {
    await fetch(dictionaryURL)
      .then(results => results.json())
      .then(data => {
        data.status.forEach(element => {
          this.setState(prevstate => {
            prevstate.statusDictionary[element.id] = element.name;
          });
        });
        data.os.forEach(element => {
          this.setState(prevstate => {
            prevstate.osDictionary[element.id] = element.name;
          });
        });
      });
    console.log('statusDict:', this.state.statusDictionary);
    console.log('osDict:', this.state.osDictionary);
  };

  handleChange = event => {
    if (
      Object.keys(this.state.statusDictionary).find(
        key => this.state.statusDictionary[key] === event.target.value
      ) !== undefined
    ) {
      const status = parseInt(
        Object.keys(this.state.statusDictionary).find(
          key => this.state.statusDictionary[key] === event.target.value
        ),
        10
      );
      this.setState({ status });
    } else {
      const os = parseInt(
        Object.keys(this.state.osDictionary).find(
          key => this.state.osDictionary[key] === event.target.value
        ),
        10
      );
      this.setState({ os });
    }
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
                  value={this.state.statusDictionary[this.state.status]}
                  onChange={this.handleChange}
                >
                  {Object.keys(this.state.statusDictionary).map((status, i) => (
                    <option key={i}>
                      {this.state.statusDictionary[status]}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">Select OS</Label>
                <Input
                  type="select"
                  name="selectOS"
                  id="exampleSelectOS"
                  value={this.state.osDictionary[this.state.os]}
                  onChange={this.handleChange}
                >
                  {Object.keys(this.state.osDictionary).map((os, i) => (
                    <option key={i}>{this.state.osDictionary[os]}</option>
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
                  this.state.os,
                  this.state.ip,
                  this.state.mac
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
