import React, { Component } from "react";
import {
  Input,
  Form,
  Button,
  Segment,
  Header,
  Message,
  Dimmer,
  Loader,
} from "semantic-ui-react";

// POST request function
import { postCommodity } from "../functions/CommodityFunctions";

class SurveyorCommodities extends Component {
  state = {
    name: "",
    price: "",
    date: "",
    loading: false,
    message: true,
    messageType: false,
    errorMessage: "",
  };

  // Set state when input change
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Button submit
  onSubmit = (e) => {
    if (this.state.name !== "") {
      // Set loading and message
      this.setState({ messageHidden: true });
      this.setState({ loading: true });
      this.setState({ errorMessage: "" });

      // New commodity data
      const newCommodity = {
        name: this.state.name,
        price: this.state.price,
        date: this.state.date,
      };

      // Call POST request for insert commodity
      postCommodity(newCommodity)
        .then((res) => {
          if (!res.errorMessage) {
            // Set loading and message
            this.setState({ messageHidden: false });
            this.setState({ loading: false });

            this.setState({ name: "" });
            this.setState({ price: "" });
            this.setState({ date: "" });

            // Redirect
            this.props.history.push(`/surveyor`);
          } else {
            this.setState({ loading: false });
            this.setState({
              errorMessage: res.errorMessage,
            });
            this.setState({ messageHidden: false });
          }
        })
        .catch((err) => {
          this.setState({ loading: false });
          this.setState({
            errorMessage: "Unexpected error",
          });
          this.setState({ messageHidden: false });
        });
    }
  };

  componentDidMount() {
    // Check role user, only surveyor (role_id = 2) can access this page
    if (localStorage.role_id !== "2") {
      this.props.history.push(`/`);
    }

    localStorage.setItem("activeItem", "surveyor");
  }

  render() {
    return (
      <Segment>
        {/* Error message or success message */}
        <Message
          success={this.state.errorMessage ? false : true}
          negative={this.state.errorMessage ? true : false}
          header={this.state.errorMessage ? "Error" : "Success"}
          content={
            this.state.errorMessage
              ? this.state.errorMessage
              : "Your data has been submited"
          }
          hidden={this.state.messageHidden}
        />
        <Segment basic>
          <Header size="large">Surveyor</Header>
        </Segment>

        <Segment>
          {/* Loading while send post request */}
          <Dimmer active={this.state.loading} inverted>
            <Loader>Loading</Loader>
          </Dimmer>

          {/* Form surveyor */}
          <Form>
            <Form.Field>
              <label>Commodity Name</label>
              <Input
                onChange={this.onChange}
                value={this.state.name}
                placeholder="Commodity Name"
                name="name"
                type="text"
                fluid
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Price</label>
              <Input
                onChange={this.onChange}
                value={this.state.price}
                placeholder="Price"
                name="price"
                type="text"
                fluid
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Date</label>
              <Input
                onChange={this.onChange}
                value={this.state.date}
                type="date"
                name="date"
                fluid
                required
              />
            </Form.Field>
            <Button type="submit" onClick={this.onSubmit}>
              Submit
            </Button>
          </Form>
        </Segment>
      </Segment>
    );
  }
}

export default SurveyorCommodities;
