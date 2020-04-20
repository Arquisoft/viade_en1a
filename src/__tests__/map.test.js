import React from "react";
import { render, cleanup } from "react-testing-library";
import SimpleMap from "../containers/Maps/maps.component";

afterAll(cleanup);

describe.only("MapComponent", () => {
	const { container } = render(<SimpleMap />);

it("SimpleMap renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});