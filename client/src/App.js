import React from 'react';
import 'react-table/react-table.css';
import { Grid, Row, Button } from 'react-bootstrap';
import Table from './components/Table/Table';

const App = props => (
  <Grid>
    <Row>
      <Button> Hi</Button>
    </Row>
    <Row className="show-grid">
      <Table
        url="http://localhost:5000/machines"
        dictionaryURL="http://localhost:5000/getdictionary"
      />
    </Row>
  </Grid>
);

export default App;
