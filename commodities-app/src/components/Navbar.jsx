import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  state = {};

  handleItemClick = (e, { name }) => {
    localStorage.setItem("activeItem", name);
  };

  logout = () => {
    localStorage.removeItem("usertoken");
    localStorage.removeItem("role_id");
    this.props.history.push(`/login`);
  };

  render() {
    return (
      <Menu pointing secondary size="massive">
        {localStorage.role_id === "1" ? (
          <Link to="/admin">
            <Menu.Item
              as="h3"
              name="admin"
              active={localStorage.activeItem === "admin"}
              onClick={this.handleItemClick}
            />
          </Link>
        ) : localStorage.role_id === "2" ? (
          <Link to="/surveyor">
            <Menu.Item
              as="h3"
              name="surveyor"
              active={localStorage.activeItem === "surveyor"}
              onClick={this.handleItemClick}
            />
          </Link>
        ) : (
          <Link to="/home">
            <Menu.Item
              as="h3"
              name="home"
              active={localStorage.activeItem === "home"}
              onClick={this.handleItemClick}
            />
          </Link>
        )}

        <Menu.Menu position="right">
          {localStorage.usertoken ? (
            <Menu.Item
              name="logout"
              active={localStorage.activeItem === "logout"}
              onClick={this.logout}
            />
          ) : (
            <Link to="/login">
              <Menu.Item
                as="h3"
                name="login"
                active={localStorage.activeItem === "login"}
                onClick={this.handleItemClick}
              />
            </Link>
          )}
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Navbar;
