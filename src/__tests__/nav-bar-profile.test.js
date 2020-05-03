import React from "react";
import { render, cleanup } from "react-testing-library";
import NavBarProfile from "../components/AuthNavBar/children/NavbarProfile/nav-bar-profile.component";

afterAll(cleanup);

const { container } = render(<NavBarProfile t={(key) => key} />);

describe("NavBarProfile", () => {
  it("renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  
  test("renders NavBarProfile elements", () => {
    expect(document.querySelectorAll("Dropdown[id='dropdownProfile'")).toBeTruthy();
  });
});
