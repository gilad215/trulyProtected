import React from 'react';
import 'react-table/react-table.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Grid, Row, Button, Col } from 'react-bootstrap';
import Table from './components/Table/Table';
import TPModal from './components/Modal/Modal';

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

  render() {
    return (
      <Grid>
        <Row>
          <Button onClick={this.showModal}>Hi</Button>
          {this.state.showModal && <TPModal />}
        </Row>
        <Row className="show-grid">
          <Col xs={12} md={12}>
            <Table
              url="http://localhost:5000/machines"
              dictionaryURL="http://localhost:5000/getdictionary"
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
