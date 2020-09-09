import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import Login from "./components/Login";

test("renders login", () => {
  render(<App />);
  // const linkElement = getByText("Username");
  // expect(getByText("Login")).toBeInTheDocument();
  // const linkElement = getByText("Password");
  // expect(getByText("Password")).toBeInTheDocument();
});
