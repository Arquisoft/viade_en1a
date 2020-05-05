import "jest";

import {
    defineFeature,
    loadFeature,
} from "jest-cucumber";

const feature = loadFeature("./e2e/features/login.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;

defineFeature(feature, test => {

    beforeEach(async () => {
        jest.setTimeout(30000000);
    });

    test("User log in", ({ given, when,and, then }) => {

        given("a user trying to log in", async () => {
            browser = await puppeteer.launch({
                headless: false,
                timeout: 3000000
            });

            page = await browser.newPage();
            await page.goto("http://localhost:3000/#/login", {
                waitUntil: "networkidle2",
                timeout: 3000000
            });
        });

        when("introducing the url", async () => {

            await page.waitForSelector(".sc-EHOje.cffgrt");
            await page.type(".sc-EHOje.cffgrt", "https://viade1a.solid.community/profile/card#me");

            await page.evaluate(() => {
                let btns = [...document.querySelectorAll("button")];
                btns.forEach(function (btn) {
                    if (btn.innerText === "Iniciar sesión"){
                        btn.click();
                    }
                });
            });
        });

        and("introducing the data", async () => {

            await page.waitForSelector("[id='username']", {visible: true});
            await page.type("[id='username']", "viade1a");

            await page.waitFor(500);
            await page.waitForSelector("[id='password']", {visible: true});
            await page.type("[id='password']", "putosolid", {visible: true});

            await page.waitFor(500);

            await page.evaluate(() => {
                let btns = [...document.querySelector(".form-horizontal.login-up-form").querySelectorAll("button")];
                btns.forEach(function (btn) {
                    if (btn.innerText === "Log In"){
                        btn.click();
                    }
                });
            });
        });

        then("we are logged in and welcome is shown", async () => {

            await page.waitForNavigation({
                waitUntil: "networkidle2"
            });

            expect(page.url()).toBe("http://localhost:3000/viade_en1a/#/welcome");
            await browser.close();
        });
    });
});