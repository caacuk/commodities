import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  logout = () => {
    localStorage.removeItem("usertoken");
    localStorage.removeItem("role_id");
    window.location.reload();
  };

  render() {
    const { activeItem } = this.state;
    return (
      <Menu pointing secondary size="massive">
        {localStorage.role_id === "1" ? (
          <Link to="/admin">
            <Menu.Item
              name="admin"
              active={activeItem === "home" || activeItem === "admin"}
              onClick={this.handleItemClick}
            />
          </Link>
        ) : localStorage.role_id === "2" ? (
          <Link to="/surveyor">
            <Menu.Item
              name="surveyor"
              active={activeItem === "home" || activeItem === "surveyor"}
              onClick={this.handleItemClick}
            />
          </Link>
        ) : (
          <Link to="/home">
            <Menu.Item
              name="home"
              active={activeItem === "home"}
              onClick={this.handleItemClick}
            />
          </Link>
        )}

        <Menu.Menu position="right">
          {localStorage.usertoken ? (
            <Link to="/logout">
              <Menu.Item
                name="logout"
                active={activeItem === "logout"}
                onClick={this.logout}
              />
            </Link>
          ) : (
            <Link to="/login">
              <Menu.Item
                name="login"
                active={activeItem === "login"}
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
