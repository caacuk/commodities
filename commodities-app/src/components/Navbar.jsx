import React, { Component } from "react";
import { Menu } from "semantic-ui-react";

class Navbar extends Component {
  state = {};

  handleItemClick = (e, { name }) => {
    localStorage.setItem("activeItem", name);
  };

  logout = () => {
    localStorage.removeItem("usertoken");
    localStorage.removeItem("role_id");
    // localStorage.setItem("activeItem", "home");
    this.props.history.push(`/login`);
  };

  render() {
    return (
      <Menu pointing secondary size="massive">
        {localStorage.role_id === "1" ? (
          <Menu.Item
            link
            name="admin"
            active={localStorage.activeItem === "admin"}
            onClick={this.handleItemClick}
            href="/admin"
          />
        ) : localStorage.role_id === "2" ? (
          <Menu.Item
            link
            name="surveyor"
            active={localStorage.activeItem === "surveyor"}
            onClick={this.handleItemClick}
            href="/surveyor"
          />
        ) : (
          <Menu.Item
            link
            name="home"
            active={localStorage.activeItem === "home"}
            onClick={this.handleItemClick}
            href="/home"
          />
        )}

        <Menu.Menu position="right">
          {localStorage.usertoken ? (
            <Menu.Item
              link
              name="logout"
              active={localStorage.activeItem === "logout"}
              onClick={this.logout}
              href="/logout"
            />
          ) : (
            <Menu.Item
              link
              name="login"
              active={localStorage.activeItem === "login"}
              onClick={this.handleItemClick}
              href="/login"
            />
          )}
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Navbar;
