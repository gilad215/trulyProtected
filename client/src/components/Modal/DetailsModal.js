import React from 'react';
import classnames from 'classnames';
import Proptypes from 'prop-types';
import axios from 'axios';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col
} from 'reactstrap';
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DetailsTable from '../Table/DetailsTable';
import UserTable from '../Table/UserTable';

class DetailsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nestedModal: false,
      activeTab: '1',
      severeDictionary: {},
      logsTable: [],
      userTable: []
    };
  }
  componentWillMount = async () => {
    await fetch(this.props.dictionaryURL)
      .then(results => results.json())
      .then(data => {
        data.forEach(element => {
          this.setState(prevstate => {
            prevstate.severeDictionary[element.id] = element.name;
          });
        });
      });
    this.fetchLogs(this.props.id);
    this.fetchUsers(this.props.id);
  };

  componentWillReceiveProps = nextProps => {
    this.fetchLogs(nextProps.id);
    this.fetchUsers(nextProps.id);
  };
  fetchLogs = async id => {
    let joinedData;
    await axios.get(`${this.props.dataURL}/${id}`).then(response => {
      joinedData = response.data;

      joinedData.forEach(element => {
        if (this.state.severeDictionary[element.severityId] !== undefined) {
          element.severityId = this.state.severeDictionary[element.severityId];
        } else element.severityId = 'N/A';
      });
    });
    if (joinedData.length > 0) {
      this.setState({ logsTable: joinedData });
    }
  };

  fetchUsers = async id => {
    await axios.get(`${this.props.loginInfo}/${id}`).then(response => {
      console.log(response.data);
      this.setState({ userTable: response.data });
    });
  };

  handleDelete = id => {
    this.props.handleDelete(id);
    this.toggleAll();
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  toggleNested = () => {
    this.setState({
      nestedModal: !this.state.nestedModal
    });
  };

  toggleAll = () => {
    this.setState({
      nestedModal: !this.state.nestedModal,
      modal: !this.state.modal
    });
  };

  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  maintenanceFunc = () => {
    console.log('Maintenance!');
  };

  render() {
    const actions = [
      <Button color="secondary" onClick={this.toggle}>
        CLOSE
      </Button>
    ];
    const nestedActions = [
      <Button color="danger" onClick={() => this.handleDelete(this.props.id)}>
        DELETE
      </Button>,
      ' ',
      <Button color="secondary" onClick={this.toggleNested}>
        CANCEL
      </Button>
    ];
    return (
      <MuiThemeProvider>
        <Dialog
          title={`Machine ${this.props.id}`}
          actions={actions}
          modal={false}
          open={this.state.modal}
          onRequestClose={this.toggle}
        >
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  href="#"
                  className={classnames({
                    active: this.state.activeTab === '1'
                  })}
                  onClick={() => {
                    this.toggleTab('1');
                  }}
                >
                  Activity
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#"
                  className={classnames({
                    active: this.state.activeTab === '2'
                  })}
                  onClick={() => {
                    this.toggleTab('2');
                  }}
                >
                  Users
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#"
                  className={classnames({
                    active: this.state.activeTab === '3'
                  })}
                  onClick={() => {
                    this.toggleTab('3');
                  }}
                >
                  Actions
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Row style={{ height: '300px' }}>
                  <Col sm="12">
                    <DetailsTable tableData={this.state.logsTable} />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row style={{ height: '300px' }}>
                  <Col sm="12">
                    <UserTable tableData={this.state.userTable} />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Row style={{ height: '300px' }}>
                  <Col sm="6" style={{ marginTop: '15px' }}>
                    <Card body>
                      <CardTitle>Run Maintenance</CardTitle>
                      <CardText>
                        Running Maintenance on this Machine will automatically
                        log off every user and suspend it.
                      </CardText>
                      <Button
                        color="info"
                        onClick={() => this.maintenanceFunc()}
                      >
                        MAINTENANCE
                      </Button>
                    </Card>
                  </Col>
                  <Col sm="6" style={{ marginTop: '15px' }}>
                    <Card body>
                      <CardTitle>Delete Machine</CardTitle>
                      <CardText>
                        Deleting the Machine will Erase all encrypted Data on
                        it. This cannot be undone. Please use with caution.
                      </CardText>
                      <Button color="danger" onClick={this.toggleNested}>
                        DELETE MACHINE
                      </Button>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
          <Dialog
            title="Confirm Delete"
            actions={nestedActions}
            modal
            open={this.state.nestedModal}
            onRequestClose={this.toggleNested}
          >
            This cannot be undone. Please use with caution.
          </Dialog>
        </Dialog>
      </MuiThemeProvider>
    );
  }
}

DetailsModal.propTypes = {
  id: Proptypes.number.isRequired,
  handleDelete: Proptypes.func.isRequired,
  dictionaryURL: Proptypes.string.isRequired,
  dataURL: Proptypes.string.isRequired,
  loginInfo: Proptypes.string.isRequired
};

export default DetailsModal;
