/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Form, FormGroup, Label, Input, Button, Col } from 'reactstrap';
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
      ip: '',
      mac: ''
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
  };

  handleAdd = (hostname, status, os, ip, mac) => {
    this.props.handleAdd(hostname, status, os, ip, mac);

    this.toggle();
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

  handleIpChange = event => {
    this.setState({ ip: event.target.value });
  };

  handleMacChange = event => {
    this.setState({ mac: event.target.value });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    const actions = [
      <Button
        color="success"
        onClick={() =>
          this.handleAdd(
            this.state.hostname,
            this.state.status,
            this.state.os,
            this.state.ip,
            this.state.mac
          )
        }
      >
        SUBMIT
      </Button>,
      ' ',
      <Button color="secondary" onClick={this.toggle}>
        CANCEL
      </Button>
    ];
    return (
      <MuiThemeProvider>
        <Dialog
          title="Add Machine"
          actions={actions}
          modal={false}
          open={this.state.modal}
          onRequestClose={this.toggle}
        >
          <Form>
            <FormGroup row>
              <Label for="examplehostname" sm={2}>
                Hostname
              </Label>
              <Col sm={10}>
                <Input
                  type="name"
                  name="hostname"
                  id="examplehostname"
                  placeholder="Enter Hostname"
                  onChange={this.handleHostnameChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleip" sm={2}>
                IP
              </Label>
              <Col sm={10}>
                <Input
                  type="name"
                  name="ip"
                  id="exampleip"
                  placeholder="Enter IP Address"
                  onChange={this.handleIpChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="examplemac" sm={2}>
                MAC
              </Label>
              <Col sm={10}>
                <Input
                  type="name"
                  name="mac"
                  id="examplemac"
                  placeholder="Enter MAC Address"
                  onChange={this.handleMacChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleSelect" sm={2}>
                Select Status
              </Label>
              <Col sm={10}>
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
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleSelect" sm={2}>
                Select OS
              </Label>
              <Col sm={10}>
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
              </Col>
            </FormGroup>
          </Form>
        </Dialog>
      </MuiThemeProvider>
    );
  }
}

export default AddModal;
