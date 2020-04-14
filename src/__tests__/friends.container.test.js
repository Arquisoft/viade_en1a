import React from "react";
import { render, cleanup } from "react-testing-library";
import { FriendsComponent } from "../containers/Friends/friends.container";
import { start } from "molid";

import "jest-dom/extend-expect";

afterAll(cleanup);

describe.only("Using molid", () => {
  let molid;
  beforeAll(async () => {
    molid = await start({
      dataDir: "./.molid",
    });
  });

  afterAll(async () => {
    await molid.stop();
  });

  test("renders without crashing", () => {
    const webId = molid.uri("/profile/card#me");
    const { container } = render(
      <FriendsComponent {...{ webId }} />
    );

    expect(container).toBeTruthy();
  });

  test("renders its child, FriendsPageContent, correctly", () => {
    const friendsContainer = document.querySelector("#friendsContainer");

    expect(friendsContainer).toBeTruthy();
  });

  test("fetches the threee friends", () => {
    expect(document.querySelectorAll("a[href='https://adrianperezmanso.solid.community/']")).toBeTruthy();
    expect(document.querySelectorAll("a[href='https://drastur.solid.community/']")).toBeTruthy();
    expect(document.querySelectorAll("a[href='https://inadover.inrupt.net/']")).toBeTruthy();
  });
});
