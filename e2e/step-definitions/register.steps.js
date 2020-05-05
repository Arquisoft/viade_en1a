import "jest";

import {
    defineFeature,
    loadFeature,
} from "jest-cucumber";

const feature = loadFeature("./e2e/features/register.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;

defineFeature(feature, test => {

    beforeEach(async () => {
        jest.setTimeout(1200000);
    });

    test("Register already registered user", ({ given, when,and, then }) => {

        given("An already registered user", async () => {
            browser = await puppeteer.launch({
                headless: false
            });

            page = await browser.newPage();
            await page.goto("https://solid.community/register?returnToUrl=http://localhost:3000/register/success", {
                waitUntil: "networkidle2"
            });
        });

        when("Choosing register", async () => {

           // await page.waitForSelector(".sc-EHOje.cffgrt");
           // await page.type(".sc-EHOje.cffgrt", "https://viade1a.solid.community/profile/card#me");

            await page.evaluate(() => {
                let btns = [...document.querySelectorAll("button")];
                btns.forEach(function (btn) {
                    if (btn.innerText === "Registrarse por una identidad Solid"){
                        btn.click();
                    }
                });
            });
        });

        and("Introducing the data", async () => {

            await page.waitForSelector("[id='username']", {visible: true});
            await page.type("[id='username']", "viade1a");
            await page.waitFor(500);
            await page.waitForSelector("[id='password']", {visible: true});
            await page.type("[id='password']", "putosolid", {visible: true});
            await page.waitFor(500);
            await page.waitForSelector("[id='repeat_password']", {visible: true});
            await page.type("[id='repeat_password']", "putosolid", {visible: true});
            await page.waitFor(500);
            await page.waitForSelector("[id='name']", {visible: true});
            await page.type("[id='name']", "viade1a", {visible: true});
            await page.waitFor(500);
            await page.waitForSelector("[id='email']", {visible: true});
            await page.type("[id='email']", "UO263909@uniovi.es", {visible: true});

            await page.waitFor(500);
            await expect(page).toClick("button", { text: "Register" });
          
        });

        then("redirects to new user", async () => {

            await page.waitForNavigation({
                waitUntil: "networkidle2"
            });
            expect(page.url()).toBe("https://solid.community/api/accounts/new");
            await browser.close();
        });
    });
});