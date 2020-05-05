import "jest";
import {defineFeature, loadFeature,} from "jest-cucumber";
import {loginSteps} from "../login-steps";

const feature = loadFeature("./e2e/features/listing-routes.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;

defineFeature(feature, test => {

    beforeEach(async () => {
        jest.setTimeout(30000000);
    });

    test("Listing routes from POD", ({given, when, and, then}) => {

        given("An already logged in user", async () => {
            browser = await puppeteer.launch({
                headless: false,
                timeout: 3000000
            });
            await loginSteps(page, browser);
        });


        when("Clicking on view routes", async () => {

            page = await browser.newPage();
            await page.goto("http://localhost:3000/#/maps", {
                waitUntil: "networkidle2",
                timeout: 3000000
            });
        });

        then("Visualize routes", async () => {
            await expect(page).toMatchElement("button", {text: "Test Route", timeout: 400000});

            await browser.close();
        });
    });
})
;