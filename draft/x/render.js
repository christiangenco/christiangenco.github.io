#!/usr/bin/env node

const fs = require("fs");
const ejs = require("ejs");
const fm = require("front-matter");
const marked = require("marked");

function read(path) {
  const content = fs.readFileSync(path, {
    encoding: "utf8",
  });
  // attributes, body
  return fm(content);
}

function render(md) {
  const html = marked(md);
  return html;
}

function template({ attributes, body }) {
  const templ = fs.readFileSync("src/_template.html", {
    encoding: "utf8",
  });
  const main = render(body);
  const html = ejs.render(templ, { ...attributes, main });
  return html;
}

async function main() {
  const { attributes, body } = read("_books/2016-06-22-food-rules.md");
  const output = template({ attributes, body });
  console.log(output);
}
main();
