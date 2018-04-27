import React from 'react';
import 'react-table/react-table.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Grid, Row } from 'react-bootstrap';
import { Nav, NavbarBrand, NavItem, Button } from 'reactstrap';
import '../node_modules/grommet-css';
import TableContainer from './components/Table/TableContainer';
import Charts from './components/Charts/Charts';
import NanoNavbar from './components/NavBar/NavBar';
import NavAlert from './components/Alert/NavAlert';
import Footer from './components/Footer/Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handler = React.createRef();
    this.state = {
      alertType: 'success',
      showAlert: false,
      tableData: []
    };
  }

  addMachine = () => {
    this.handler.current.deployAdd();
  };

  handleAlert = type => {
    if (type === 'addsuccess') {
      this.setState({
        showAlert: true,
        alertType: 'success',
        alertText: 'Added Machine Succesfully'
      });
    } else if (type === 'delsuccess') {
      this.setState({
        showAlert: true,
        alertType: 'danger',
        alertText: 'Deleted Machine Succesfully'
      });
    } else {
      this.setState({
        showAlert: true,
        alertType: 'danger',
        alertText: 'ERROR'
      });
    }
  };

  updateCharts = tableData => {
    this.setState({ tableData });
  };

  toggleAlert = () => {
    this.setState({ showAlert: false });
  };

  render() {
    return (
      <div>
        <NanoNavbar color="Collapsed" light expand="md" fixed="top">
          <NavbarBrand id="tpTitle" href="/">
            <img id="logoimg" src="/logo.ico" alt="" /> TrulyProtect
          </NavbarBrand>
          <Nav className="ml-auto" navbar style={{ marginRight: '8%' }}>
            <NavItem style={{ lineHeight: '10px' }}>
              <NavAlert
                alertType={this.state.alertType}
                showAlert={this.state.showAlert}
                toggleAlert={this.toggleAlert}
                alertText={this.state.alertText}
              />
            </NavItem>
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
              handleAlert={this.handleAlert}
              updateCharts={this.updateCharts}
            />
          </Row>
          <Charts tableData={this.state.tableData} />
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default App;
