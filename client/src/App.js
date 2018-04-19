import React from 'react';
import 'react-table/react-table.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Grid, Row } from 'react-bootstrap';
import { Nav, NavbarBrand } from 'reactstrap';
import TableContainer from './components/Table/TableContainer';
import NanoNavbar from './components/NavBar/NavBar';

const App = props => (
  <div>
    <NanoNavbar color="Collapsed" light expand="md" fixed="top">
      <NavbarBrand href="/">truly</NavbarBrand>
      <Nav className="ml-auto" navbar />
    </NanoNavbar>
    <Grid id="Popover1" style={{ marginTop: '65px' }}>
      <Row />
      <Row className="show-grid">
        <TableContainer
          url="http://localhost:5000/machines"
          dictionaryURL="http://localhost:5000/getdictionary"
        />
      </Row>
    </Grid>
  </div>
);

export default App;
