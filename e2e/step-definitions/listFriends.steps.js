import "jest";

import {
    defineFeature,
    loadFeature,
} from "jest-cucumber";

const feature = loadFeature("./e2e/features/listFriends.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;


defineFeature(feature, test => {

    beforeEach(async () => {
        jest.setTimeout(100000000);
    });

    test("Listing friends of a logged user", ({ given, when,and, then }) => {

        given("a logged in user", async () => {
            browser = await puppeteer.launch({
                headless: false
            });

            page = await browser.newPage();
            await page.goto("http://localhost:3000/#/login", {
                waitUntil: "networkidle2"
                , timeout: 400000
            });
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

        when("trying to see friends", async () => {
           
            page = await browser.newPage();
            await page.goto("http://localhost:3000/#/friends", {
                waitUntil: "networkidle2",
                timeout: 3000000
            });

        });


        then("we can see the friends", async () => {
            await expect(page).toMatchElement("div", {id: "Daniel Adrian Mare", timeout: 400000});

            await browser.close();
        });
    });
});