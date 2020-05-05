export async function loginSteps(page, browser) {
    page = await browser.newPage();
    await page.goto("http://localhost:3000/#/login", {
        waitUntil: "networkidle2",
        timeout: 3000000
    });

    await page.waitForSelector(".sc-EHOje.cffgrt");
    await page.type(".sc-EHOje.cffgrt", "https://viade1a.solid.community/profile/card#me");

    await page.evaluate(() => {
        let btns = [...document.querySelectorAll("button")];
        btns.forEach(function (btn) {
            if (btn.innerText === "Iniciar sesión") {
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
            if (btn.innerText === "Log In") {
                btn.click();
            }
        });
    });

    await page.waitForNavigation({
        waitUntil: "networkidle2"
    });

}