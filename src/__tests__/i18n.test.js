import React from "react";
import { render } from "react-testing-library";
import backend from "../i18n";

describe("Login", () => {
  test("renders without crashing", () => {
    expect(backend).toBeTruthy();
  });
});
