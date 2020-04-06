import React from "react";
import { render, cleanup } from "react-testing-library";
import { FriendsPageContent } from "../containers/Friends/friends.component";

import "jest-dom/extend-expect";

afterAll(cleanup);

describe.only("FriendsComponent", () => {
  const friends = [
    {
      webId: "https://friend1.example/",
      name: "friend1",
      image: "img/noimg.svg"
    },
    {
        webId: "https://friend2.example/",
        name: "friend2",
        image: "img/noimg.svg"
    },
    {
        webId: "https://friend3.example/",
        name: "friend3",
        image: "img/noimg.svg"
    },
  ];

  const webId = "https://user.example/";

  const { container } = render(
    <FriendsPageContent {...{ friends, webId }} />
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  test("renders three children if the friends list", () => {
    const friendsList = document.querySelector("#friendsList");

    expect(friendsList.childNodes.length).toBe(3);
  });

  test("renders the right three friend items", () => {
    const friend1 = document.querySelector("#friendfriend1");
    const friend2 = document.querySelector("#friendfriend2");
    const friend3 = document.querySelector("#friendfriend3");

    expect(friend1).toBeTruthy();
    expect(friend2).toBeTruthy();
    expect(friend3).toBeTruthy();
  });
});
