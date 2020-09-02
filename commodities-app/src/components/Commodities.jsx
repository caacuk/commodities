import React, { Component } from "react";
import { Segment, Table, Header, Dimmer, Loader } from "semantic-ui-react";

// GET request function
import { getCommoditiesByStatus } from "./CommodityFunctions";

class Commodities extends Component {
  state = {
    commodities: [
      //   { no: 1, name: "a", price: 500000, date: "ini date", status: 1 },
    ],
    loading: true,
  };

  // Get commodities
  getCommodityData() {
    getCommoditiesByStatus().then((res) => {
      this.setState({ commodities: res });
      this.setState({ loading: false });
    });
  }

  componentDidMount() {
    localStorage.setItem("activeItem", "home");
    this.getCommodityData();
  }

  render() {
    return (
      <Segment>
        <Segment basic>
          <Header size="large">Commodities</Header>
        </Segment>
        <Segment>
          {/* Loading */}
          <Dimmer active={this.state.loading} inverted>
            <Loader>Loading</Loader>
          </Dimmer>

          {/* Table of commodities */}
          <Table celled>
            <Table.Header>
              <Table.Row>
                {/* <Table.HeaderCell width="1">No</Table.HeaderCell> */}
                <Table.HeaderCell width="5">Commodity Name</Table.HeaderCell>
                <Table.HeaderCell width="5">Price</Table.HeaderCell>
                <Table.HeaderCell width="5">Date</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.state.commodities
                ? this.state.commodities.map((d, i) => (
                    <Table.Row key={`${d.id}-${i}`}>
                      {/* <Table.Cell>{i + 1}</Table.Cell> */}
                      <Table.Cell>{d.name}</Table.Cell>
                      <Table.Cell>Rp. {d.price}</Table.Cell>
                      <Table.Cell>{d.date}</Table.Cell>
                    </Table.Row>
                  ))
                : "loading"}
            </Table.Body>
          </Table>
        </Segment>
      </Segment>
    );
  }
}

export default Commodities;
