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
import { getCommodities } from "../functions/CommodityFunctions";
import { putCommodity } from "../functions/CommodityFunctions";
import { deleteCommodity } from "../functions/CommodityFunctions";

class AdminCommodities extends Component {
  state = {
    commodities: [
      //   { no: 1, name: "a", price: 500000, date: "ini date", status: 1 },
    ],
    loading: true,
    loadingButton: false,
    openModal: false,
  };

  // Call GET request commodities
  async getCommodityData() {
    try {
      const res = await getCommodities();
      this.setState({ commodities: res.data });
      this.setState({ loading: false });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    if (localStorage.role_id !== "1") {
      return this.props.history.push(`/`);
    }

    localStorage.setItem("activeItem", "admin");
    this.getCommodityData();
  }

  componentDidUpdate() {
    if (this.state.commodities) {
      this.getCommodityData();
    }
  }

  // Button status clicked
  handleChangeStatus = (d) => {
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
    putCommodity(updateCommodity).then((res) => {
      this.getCommodityData();
      this.setState({ loadingButton: false });
    });
  };

  // Button delete clicked
  handleDeleteComodity = (d) => {
    this.setState({ loadingButton: true });

    // Commodity data
    const deleteCommodityData = {
      id: d.id,
    };

    // Call POST request for delete commodity
    deleteCommodity(deleteCommodityData).then((res) => {
      this.getCommodityData();
      this.setState({ loadingButton: false });
    });
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
                      {/* Name */}
                      <Table.Cell>{d.name}</Table.Cell>

                      {/* Price */}
                      <Table.Cell>
                        Rp.{" "}
                        {d.price
                          .toString()
                          .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
                      </Table.Cell>
                      <Table.Cell>{d.date}</Table.Cell>

                      {/* Status */}
                      <Table.Cell>
                        <Button
                          icon="checkmark"
                          positive={d.status === 1}
                          loading={this.state.loadingButton}
                          key={d.id}
                          onClick={() => this.handleChangeStatus(d)}
                        ></Button>
                      </Table.Cell>

                      {/* Delete Button */}
                      <Table.Cell>
                        <Button
                          icon="close"
                          negative
                          key={d.id}
                          onClick={() => this.handleDeleteComodity(d)}
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
