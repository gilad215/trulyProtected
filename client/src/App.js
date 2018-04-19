import React from 'react';
import 'react-table/react-table.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Grid, Row, Col } from 'react-bootstrap';
import { Nav, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import Table from './components/Table/Table';
import NanoNavbar from './components/NavBar/NavBar';
import AddModal from './components/Modal/AddModal';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };
  }

  showModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleAdd = async (hostname, status, os, ip, mac) => {
    const machine = {
      hostname,
      ip,
      mac,
      status,
      os
    };
    console.log('machine: ', JSON.stringify(machine));
    await fetch('http://localhost:3000/insert', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(machine)
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => {
        console.log('ok');
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <NanoNavbar color="Collapsed" light expand="md" fixed="top">
          <NavbarBrand href="/">truly</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink onClick={this.togglePopover} href="/components/">
                Notifications
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/login">Account</NavLink>
            </NavItem>
          </Nav>
        </NanoNavbar>
        <Grid id="Popover1" style={{ marginTop: '100px' }}>
          <Row />
          <Row className="show-grid">
            <Col xs={12} md={12}>
              <AddModal
                dictionaryURL="http://localhost:5000/getdictionary"
                handleAdd={this.handleAdd}
              />
              <Table
                url="http://localhost:5000/machines"
                dictionaryURL="http://localhost:5000/getdictionary"
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
