import React from "react";
import { render, cleanup } from "react-testing-library";
import { FriendsPageContent } from "../containers/Friends/friends.component";
import { FriendsComponent } from "../containers/Friends/friends.container";

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

  const webId = "https://victorgon.inrupt.net/";

  const { container, getByTestId } = render(
    <FriendsPageContent {...{ friends, webId }} />
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  test("renders three friend items", () => {
    const friendsList = document.querySelector("#friendsList");

    expect(friendsList.childNodes.length).toBe(3);
  });
});
