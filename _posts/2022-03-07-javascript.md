---
title: "javascript"
image:
image_small:
excerpt: ""
---

## Find the first element match in an array

```js
const activeType = types.find((type) => type.id === value);
```

## Array without item

```js
arr.filter((item) => item !== itemToRemove);
```

## Array without item at index

Don't use [the immer way of deleting an item from an array](https://immerjs.github.io/immer/update-patterns/) (ex: `delete ray[i]`) with firebase because firebase will complain that there's an undefined item in the array.

```js
arr.filter((_, i) => i !== deleteAtIndex);
```

## Optional chaining with an array

Optional chaining lets you access nested items of objects even though the object might be null.

`response && response.answers` is the same as `response?.answers`.

Using this with arrays doesn't work like this: `response?.answers?[question.id]`.

Instead, you need an extra dot after the question mark: `response?.answers?.[question.id]`.

## Regex match

```js
const str =
  "Stream #0:0(und): Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, smpte170m/bt709/bt709), 1280x720, 10464 kb/s, 30 fps, 30 tbr, 30k tbn, 60k tbc (default)";

const [_, width, height] = str.match(/, (\d+)x(\d+)/);
```

## Regex match search for multiple results

```js
const str = `Visa ending in 5555: August 16, 2021: $155.10
Visa ending in 5555: August 16, 2021: $138.45`;

const results = str.matchAll(/\$([\d.,]+)/g);
```

## Email regex

From [Simple regex pattern for email](https://stackoverflow.com/a/50343015/1298553):

```js
const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
if (email.match(emailRegex)) alert("it's an email alright");
```

## Sort an array of objects by string

From [How to sort strings in JavaScript](https://stackoverflow.com/questions/51165/how-to-sort-strings-in-javascript):

```js
list.sort((a, b) => ("" + a.attr).localeCompare(b.attr));
```

## Sum values in an array

```js
const sum = arr.reduce((total, item) => total + item, 0);
```

## Search for parent node

```js
el.closest("tr");
```
