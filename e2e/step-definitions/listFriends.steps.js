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
            await page.click('[href="#/friends"]');

        });


        then("we can see the friends", async () => {
            await page.waitForNavigation({
                waitUntil: "networkidle2"
            });
            await page.waitFor(500);
             await page.evaluate(() => {
                let btns = [...document.querySelectorAll("div")];
                btns.forEach(function (btn) {
                    if (btn.id === "Daniel Adrian Mare"){
                        btn.click();
                    }
                });
            });
            

            expect(page.url()).toBe("http://localhost:3000/viade_en1a/#/friends");
            
            await browser.close();
        });
    });
});