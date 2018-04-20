import React from 'react';
import 'react-table/react-table.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Grid, Row } from 'react-bootstrap';
import { Nav, NavbarBrand, NavItem, Button } from 'reactstrap';
import TableContainer from './components/Table/TableContainer';
import NanoNavbar from './components/NavBar/NavBar';
/* jshint expr:true */

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handler = React.createRef();
  }

  addMachine = () => {
    this.handler.current.deployAdd();
  };

  render() {
    return (
      <div>
        <NanoNavbar color="Collapsed" light expand="md" fixed="top">
          <NavbarBrand id="tpTitle" href="/">
            <img id="logoimg" src="/logo.ico" alt="" /> TrulyProtect
          </NavbarBrand>
          <Nav className="ml-auto" navbar style={{ marginRight: '8%' }}>
            <NavItem href="/">
              <Button outline color="success" onClick={this.addMachine}>
                ADD MACHINE
              </Button>{' '}
            </NavItem>
          </Nav>
        </NanoNavbar>
        <Grid id="Popover1" style={{ marginTop: '65px', maxWidth: '85%' }}>
          <Row className="show-grid">
            <TableContainer
              url="http://localhost:5000/machines"
              dictionaryURL="http://localhost:5000/getdictionary"
              ref={this.handler}
            />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
