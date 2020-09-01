import React, { Component } from "react";
import {
  Input,
  Form,
  Button,
  Segment,
  Header,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import jwt_decode from "jwt-decode";

// POST request function
import { login } from "./UserFunctions";

class Login extends Component {
  state = { username: "", password: "", loading: false };

  // Set state when input change
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Button submit
  onSubmit = (e) => {
    this.setState({ loading: true });
    // Check input
    if (this.state.name !== "") {
      const user = {
        username: this.state.username,
        password: this.state.password,
      };

      // Call POST request for login
      login(user).then((res) => {
        if (res) {
          const decoded = jwt_decode(localStorage.usertoken);
          localStorage.setItem("role_id", decoded.role_id);

          // Redirect to admin or surveyor page
          if (localStorage.role_id === "1") {
            this.props.history.push(`/admin`);
            window.location.reload(false);
          } else {
            this.props.history.push(`/surveyor`);
            window.location.reload(false);
          }
        }
      });
    }
  };

  render() {
    return (
      <Segment>
        <Segment basic>
          <Header size="large">Login</Header>
        </Segment>
        <Segment>
          {/* Loading */}
          <Dimmer active={this.state.loading} inverted>
            <Loader>Loading</Loader>
          </Dimmer>

          {/* Form login */}
          <Form>
            <Form.Field>
              <label>Username</label>
              <Input
                onChange={this.onChange}
                value={this.state.name}
                placeholder="Username"
                name="username"
                type="text"
                fluid
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Input
                onChange={this.onChange}
                value={this.state.password}
                placeholder="Password"
                name="password"
                type="password"
                fluid
                required
              />
            </Form.Field>
            <Button type="submit" onClick={this.onSubmit}>
              Login
            </Button>
          </Form>
        </Segment>
      </Segment>
    );
  }
}

export default Login;
