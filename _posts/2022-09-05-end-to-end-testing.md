---
title: "Best library for end-to-end testing: Cypress vs. Puppeteer vs. Playwright vs. Selenium vs. WebDriver"
image:
image_small:
excerpt: ""
---

I use Jest.

`jest.retryTimes(1)`

https://alisterbscott.com/2020/08/28/playwright-jest-%F0%9F%92%96/

## Cypress

Run Cypress tests against a Vercel preview deployment:

https://github.com/marketplace/actions/vercel-cypress

## Puppeteer

Grab some text from a div:

```js
await page.goto(`${config.get("baseURL")}`);
await page.waitFor("#loadedchild", { visible: true, timeout: 5000 });
const element = await page.$("#loadedchild");
const text = await (await element.getProperty("textContent")).jsonValue();
expect(text).toBe("Loaded!");
```

## Playwright

Playwright lets you record a web session and automatically generate test code in Javascript, Typescript, Java, Python, or C#. It supports the Chromium (which drives Chrome, Edge, and Opera), Firefox, and WebKit browser engines.

The basic setup looks like this:

```js
const browser = await chromium.launch();
// "context" acts as a new incognito window
const context = await browser.newContext();
const page = await context.newPage();
page.goto("https://example.com");
```

You can take screenshots with `await page.screenshot({path: "screenshot.png"})`. You can record videos of each session with:

```js
const context = await browser.newContext({
  recordVideo: {
    dir: "videos",
  },
});
```

To find an item you use `await page.$('id=username')`.

https://www.youtube.com/watch?v=wGr5rz8WGCE

Playwright also lets you record videos and record authentication state.

Grab some text from a div:

```js
await page.goto(`${config.get("baseURL")}`);
const text = await page.textContent("#loadedchild");
expect(text).toBe("Loaded!");
```

## Selenium

To find an item you use `driver.findElement(By.id("username"))`.

```js
const driver = new FirefoxDriver();
driver.get("https://example.com");
```

## Automatically running end-to-end tests on GitHub with each Vercel deployment

https://kontent.ai/blog/next-js-playwright-tests-github-action/
