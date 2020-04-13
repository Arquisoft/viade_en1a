import React from "react";
import { render, cleanup } from "react-testing-library";
import { Profile } from "../containers";

import "jest-dom/extend-expect";

afterAll(cleanup);

describe.only("Profile", () => {
    const { container } = render(
      <Profile/>
    );

    test("renders without crashing", () => {
        expect(container).toBeTruthy();
    });

    test("renders styled components", () => {
        expect(document.querySelector(".profileWrapper")).toBeTruthy();
    });
});