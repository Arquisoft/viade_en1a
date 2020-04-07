import React from "react";
import { render, cleanup } from "react-testing-library";
import AutoSaveSpinner from "../components/AutoSaveSpinner/index";

import "jest-dom/extend-expect";

afterAll(cleanup);

describe.only("AutoSaveSpinner", () => {
  const { container } = render(
    <AutoSaveSpinner/>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});
