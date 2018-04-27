import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import { Row, Col } from 'react-bootstrap';

class Charts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      statusChartData: {},
      osChartData: {}
    };
  }

  componentWillMount() {
    this.updateOSCharts(this.props.tableData);
    this.updateStatusCharts(this.props.tableData);
  }

  componentWillReceiveProps = nextProps => {
    this.updateOSCharts(nextProps.tableData);
    this.updateStatusCharts(nextProps.tableData);
  };

  updateStatusCharts = tableData => {
    const statusData = {
      Down: { sum: 0, color: '#fb3351' },
      Protected: { sum: 0, color: '#33cc51' },
      Maintenance: { sum: 0, color: '#f7ca00' },
      Up: { sum: 0, color: '#a9adaa' }
    };

    tableData.forEach(element => {
      Object.keys(statusData).forEach(status => {
        if (element.status === status) {
          statusData[status].sum++;
        }
      });
    });
    const statusDonught = {
      labels: ['Down', 'Protected', 'Maintenance', 'Up'],
      datasets: [
        {
          data: [
            statusData.Down.sum,
            statusData.Protected.sum,
            statusData.Maintenance.sum,
            statusData.Up.sum
          ],
          backgroundColor: [
            statusData.Down.color,
            statusData.Protected.color,
            statusData.Maintenance.color,
            statusData.Up.color
          ],
          hoverBackgroundColor: [
            statusData.Down.color,
            statusData.Protected.color,
            statusData.Maintenance.color,
            statusData.Up.color
          ]
        }
      ]
    };
    this.setState({ statusChartData: statusDonught });
  };

  updateOSCharts = tableData => {
    const osData = {
      Windows: { sum: 0, color: '#1183fc' },
      Linux: { sum: 0, color: '#e05b14' }
    };

    tableData.forEach(element => {
      Object.keys(osData).forEach(os => {
        if (element.os === os) {
          osData[os].sum++;
        }
      });
    });
    const osDonught = {
      labels: ['Windows', 'Linux'],
      datasets: [
        {
          data: [osData.Windows.sum, osData.Linux.sum],
          backgroundColor: [osData.Windows.color, osData.Linux.color],
          hoverBackgroundColor: [osData.Windows.color, osData.Linux.color]
        }
      ]
    };
    this.setState({ osChartData: osDonught });
  };

  render() {
    return (
      <Row>
        <Col md={6} xs={12}>
          <Doughnut
            data={this.state.statusChartData}
            height={250}
            options={{
              maintainAspectRatio: false
            }}
          />
        </Col>
        <Col md={6} xs={12}>
          <Doughnut
            data={this.state.osChartData}
            height={250}
            options={{
              maintainAspectRatio: false
            }}
          />
        </Col>
      </Row>
    );
  }
}

Charts.propTypes = {
  tableData: PropTypes.array.isRequired
};

export default Charts;
