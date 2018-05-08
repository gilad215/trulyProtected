import React from 'react';
import 'react-table/react-table.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid, Row } from 'react-bootstrap';
import { Nav, NavbarBrand, NavItem, Button } from 'reactstrap';
import '../node_modules/grommet-css';
import TableContainer from './components/Table/TableContainer';
import Charts from './components/Charts/Charts';
import NanoNavbar from './components/NavBar/NavBar';
import NavAlert from './components/Alert/NavAlert';
import Footer from './components/Footer/Footer';
import SearchBar from './components/SearchBar/Search';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handler = React.createRef();
    this.searchHandler = React.createRef();
    this.state = {
      alertType: 'success',
      showAlert: false,
      tableData: []
    };
  }

  addMachine = () => {
    this.handler.current.deployAdd();
  };

  showLogs = () => {
    this.handler.current.handleLogs();
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

  search = value => {
    this.handler.current.handleSearch(value);
  };

  updateCharts = tableData => {
    this.setState({ tableData });
    this.searchHandler.current.resetSearch();
  };

  toggleAlert = () => {
    this.setState({ showAlert: false });
  };

  render() {
    return (
      <MuiThemeProvider>
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
            <NavItem href="/" style={{ marginRight: '5px' }}>
              <Button outline color="info" onClick={this.showLogs}>
                Activity Log
              </Button>{' '}
            </NavItem>
            <NavItem href="/" style={{ marginRight: '5px' }}>
              <Button outline color="success" onClick={this.addMachine}>
                Add Machine
              </Button>{' '}
            </NavItem>
            <NavItem>
              <SearchBar search={this.search} ref={this.searchHandler} />
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
        <Row style={{ marginTop: '50px' }}>
          <Footer />
        </Row>
      </MuiThemeProvider>
    );
  }
}

export default App;
