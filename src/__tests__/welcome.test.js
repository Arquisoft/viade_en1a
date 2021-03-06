import React from "react";
import { render, cleanup } from "react-testing-library";
import { HashRouter as Router } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { WelcomeComponent } from "../containers/Welcome/welcome.container";

library.add(fas);

const props = {
  webId: "https://exmaple.com/#me",
  image: "test.png",
  updatePhoto: "updated.png",
  name: "example"
};

describe.only("Welcome", () => {
  afterAll(cleanup);
  const { container, getByTestId } = render(
    <Router>
      <WelcomeComponent {...{ ...props }} />
    </Router>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  test("renders with styled components", () => {
    expect(getByTestId("welcome-wrapper")).toBeTruthy();
    expect(getByTestId("welcome-logo")).toBeTruthy();
    expect(getByTestId("welcome-profile")).toBeTruthy();
    expect(getByTestId("welcome-detail")).toBeTruthy();
    expect(document.querySelector(".card")).toBeTruthy();
  });

  test("renders EN1A logo", () => {
    expect(document.querySelectorAll("img[src='img/my_logo.jpg']")).toBeTruthy();
  });

  test("renders about text", () => {
    expect(document.querySelectorAll("h3[text='Acerca de']")).toBeTruthy();
  });
});
