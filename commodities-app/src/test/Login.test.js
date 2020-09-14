import React from "react";
import { render } from "@testing-library/react";
import Login from "../components/Login";

test("renders login", () => {
  const { getByText } = render(<Login />);
  expect(getByText("Username")).toBeInTheDocument();
  expect(getByText("Password")).toBeInTheDocument();
});
