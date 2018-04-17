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

  handleAdd = (hostname, status, os) => {
    // TODO Handle Add
    console.log('handle add');
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
