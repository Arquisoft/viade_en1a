import React from "react";
import { render, cleanup } from "react-testing-library";
import AuthNavBar from "../components/AuthNavBar/_auth-nav-bar.lite";
import { HashRouter as Router } from "react-router-dom";

import "jest-dom/extend-expect";

afterAll(cleanup);

describe.only("AuthNavBar", () => {
  const { container } = render(
    <Router>
        <AuthNavBar/>
    </Router>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  test("renders nav bar elements", () => {
    expect(document.querySelectorAll("a[href='#/welcome']")).toBeTruthy();
    expect(document.querySelectorAll("a[href='#/maps']")).toBeTruthy();
    expect(document.querySelectorAll("a[href='#/friends']")).toBeTruthy();
    expect(document.querySelectorAll("a[href='#/notifications']")).toBeTruthy();
  });
});
