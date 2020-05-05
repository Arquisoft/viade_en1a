import React from "react";
import {cleanup, render} from "react-testing-library";
import Notifications from "../components/Notifications/notifications.component";

afterAll(cleanup);

describe.only("Nav Bar", () => {
  const { container } = render(
    <Notifications
      {...{
        inbox: [{ path: "https://example/inbox" }],
        webId: "https://UO264608.solid.community/profile/card#me"
      }}
    />
  );

  it("renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});
