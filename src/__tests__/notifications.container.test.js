import React from "react";
import { render, cleanup } from "react-testing-library";
import { NotificationsComponent } from "../containers/Notifications/notifications.container";

import "jest-dom/extend-expect";

afterAll(cleanup);

describe.only("NotificationsContainer", () => {
  const { container } = render(
    <NotificationsComponent/>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  test("renders its child, NotificationsPageContent, correctly", () => {
    const notificationsPageContent = document.querySelector("#notificationsCard");

    expect(notificationsPageContent).toBeTruthy();
  });
});
