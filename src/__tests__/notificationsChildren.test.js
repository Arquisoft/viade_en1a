import React from "react";
import { render, cleanup } from "react-testing-library";
import Notifications from "../components/Notifications/children/Notifications/notifications.component";

afterAll(cleanup);

describe.only("Nav Bar", () => {
  const { container } = render(
    <Notifications
      {...{
        inbox: "https://example/inbox",
        webId: "https://example/profile/card#me" 
      }}
    />
  );

  it("renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});
