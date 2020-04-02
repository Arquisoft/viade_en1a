import React from "react";
import { render, cleanup } from "react-testing-library";
import { FriendsComponent } from "../containers/Friends/friends.container";

import "jest-dom/extend-expect";

afterAll(cleanup);

describe.only("FriendsContainer", () => {
  const { container } = render(
    <FriendsComponent/>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  test("renders its child, FriendsPageContent, correctly", () => {
    const friendsContainer = document.querySelector("#friendsContainer");

    expect(friendsContainer).toBeTruthy();
  });
});
