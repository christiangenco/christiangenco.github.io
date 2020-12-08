#!/usr/bin/env node

const fs = require("fs");
const ejs = require("ejs");
const fm = require("front-matter");
const marked = require("marked");
const mkdirp = require("mkdirp");
const Path = require("path");
const Glob = require("glob");
const applescript = require("applescript");
const watch = require("node-watch");

function glob(pattern) {
  return new Promise((resolve, reject) => {
    Glob(pattern, (err, paths) => {
      if (err) reject(err);
      else resolve(paths);
    });
  });
}

function refreshChrome() {
  return new Promise((resolve, reject) => {
    const script = `tell application "Google Chrome" to tell the first tab of its first window
      reload
    end tell`;

    applescript.execString(script, (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
}

function read(path) {
  const content = fs.readFileSync(path, {
    encoding: "utf8",
  });
  // attributes, body
  return fm(content);
}

function write(path, data) {
  mkdirp.sync(Path.dirname(path));
  fs.writeFileSync(path, data, { encoding: "utf8" });
}

// https://marked.js.org/using_pro
// default: https://github.com/markedjs/marked/blob/master/src/Renderer.js
const renderer = {
  heading(text, level, raw, slugger) {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");

    return `
      <h${level} id="${escapedText}">
        ${text}
        <a href="#${escapedText}" class="anchor">#</a>
      </h${level}>
    `;
  },
  link(href, title, text) {
    if (href === null) return text;
    if (title === undefined && href === text && href.includes("youtube.com")) {
      const match = href.match(/v=([\w-_]+)/);
      if (match) {
        const youtubeId = match[1];
        return `
        <div class="embed">
          <iframe
            src="https://www.youtube.com/embed/${youtubeId}"
            frameborder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      `;
      }
    }
    return `<a href="${href}"${title ? ` title="${title}"` : ""}>${text}</a>`;
  },
  image(href, title, text) {
    if (title || text) {
      let caption = title || text;
      caption = caption.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
      return `
        <figure>
          <img
            src="${href}"
            alt="${text}"
          />
          <figcaption>${marked(caption)}</figcaption>
        </figure>
      `;
    }
    return `<img src="${href}" alt="${text}"/>`;
  },
  blockquote(quote) {
    const parts = quote.split("<p>--").map(p => p.trim());
    let caption = "";
    if (parts[1]) caption = `<figcaption><p>—${parts[1]}</figcaption>`;
    return `
      <figure>
        <blockquote cite="https://www.huxley.net/bnw/four.html">
        ${parts[0]}
        </blockquote>
        ${caption}
      </figure>
    `;
  },
  // code(string code, string infostring, boolean escaped)
  // html(string html)
  // hr()
  // list(string body, boolean ordered, number start)
  // listitem(string text, boolean task, boolean checked)
  // checkbox(boolean checked)
  // paragraph(string text)
  // table(string header, string body)
  // tablerow(string content)
  // tablecell(string content, object flags)
  // strong(string text)
  // em(string text)
  // codespan(string code)
  // br()
  // del(string text)
  // text(string text)
};

marked.use({ renderer });
marked.setOptions({ sanitize: false });
function renderMarkdown(md) {
  const html = marked(md);
  return html;
}

const templ = fs.readFileSync("src/_template.html.ejs", {
  encoding: "utf8",
});
function template({ attributes, markdown, html }) {
  const output = ejs.render(templ, {
    head: "",
    title: "",
    image: null,
    ...attributes,
    main: html ? html : renderMarkdown(markdown),
  });
  return output;
}

async function render() {
  const posts = {};

  const postPaths = await glob("_*/*.md");
  await Promise.all(
    postPaths.map(path => {
      const { attributes, body } = read(path);
      const output = template({ attributes, markdown: body });
      const dest = path
        .replace("_posts/", "build/")
        .replace("_", "build/")
        .replace(/\d{4}-\d{2}-\d{2}-/, "")
        .replace(".md", "/index.html");
      write(dest, output);
      const webpath = dest.replace("/index.html", "").replace(/^build/, "");
      posts[webpath] = attributes;
      // return Promise.resolve()
    })
  );

  console.log(posts);

  const pagePaths = await glob("src/*");
  await Promise.all(
    pagePaths.map(path => {
      const filename = Path.basename(path);
      if (filename[0] !== "_") {
        const { attributes, body } = read(path);
        const html = ejs.render(body, {
          posts,
        });
        const output = template({ attributes, html });
        const dest = path
          .replace("src/", "build/")
          .replace(".html.ejs", "/index.html")
          .replace("index/index.html", "index.html");
        write(dest, output);
        console.log({ dest });
      }
    })
  );

  await refreshChrome();
}

async function main() {
  await render();

  // watch("src", { recursive: true }, (evt, name) => {
  //   console.log("%s changed.", name);
  //   render();
  // });
}
main();
