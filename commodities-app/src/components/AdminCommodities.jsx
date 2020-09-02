import React, { Component } from "react";
import {
  Table,
  Button,
  Segment,
  Header,
  Dimmer,
  Loader,
} from "semantic-ui-react";

// API request function
import { getCommodities } from "./CommodityFunctions";
import { postCommodityUpdate } from "./CommodityFunctions";

class AdminCommodities extends Component {
  state = {
    commodities: [
      //   { no: 1, name: "a", price: 500000, date: "ini date", status: 1 },
    ],
    loading: true,
    loadingButton: false,
  };

  // Call GET request commodities
  getCommodityData() {
    getCommodities().then((res) => {
      this.setState({ commodities: res });
      this.setState({ loading: false });
    });
  }

  componentDidMount() {
    if (localStorage.role_id !== "1") {
      return this.props.history.push(`/`);
    }

    localStorage.setItem("activeItem", "admin");
    this.getCommodityData();
  }

  // Button clicked
  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.name !== "") {
      const newCommodity = {
        id: this.props.id,
        status: 1,
      };

      postCommodityUpdate(newCommodity).then((res) => {
        this.setState({ loadingButton: false });
      });
    }
  };

  render() {
    return (
      <Segment>
        <Segment basic>
          <Header size="large">Admin</Header>
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
                <Table.HeaderCell width="5">Name</Table.HeaderCell>
                <Table.HeaderCell width="5">Price</Table.HeaderCell>
                <Table.HeaderCell width="5">Date</Table.HeaderCell>
                <Table.HeaderCell width="5">Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.state.commodities
                ? this.state.commodities.map((d, i) => (
                    <Table.Row key={`${d.id}-${i}`}>
                      <Table.Cell>{d.name}</Table.Cell>
                      <Table.Cell>Rp. {d.price}</Table.Cell>
                      <Table.Cell>{d.date}</Table.Cell>
                      <Table.Cell>
                        <Button
                          icon="checkmark"
                          positive={d.status === 1}
                          loading={this.state.loadingButton}
                          key={d.id}
                          onClick={() => {
                            this.setState({ loadingButton: true });

                            let statusUpdate = d.status;
                            if (statusUpdate === 1) {
                              statusUpdate = 0;
                            } else {
                              statusUpdate = 1;
                            }

                            // Commodity update data
                            const updateCommodity = {
                              id: d.id,
                              status: statusUpdate,
                            };

                            // Call POST request for update status commodity
                            postCommodityUpdate(updateCommodity).then((res) => {
                              this.getCommodityData();
                              this.setState({ loadingButton: false });
                            });
                          }}
                        ></Button>
                      </Table.Cell>
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

export default AdminCommodities;
