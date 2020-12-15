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
    if (
      title === undefined &&
      href === text &&
      (href.includes("youtube.com") || href.includes("youtu.be"))
    ) {
      let match = href.match(/v=([\w-_]+)/);
      if (!match) match = href.match(/youtu\.be\/([\w-_]+)/);
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

const latestStyleBasename = fs.readFileSync(
  "build/css/latestStyleBasename.txt",
  { encoding: "utf8" }
);
const templ = fs
  .readFileSync("src/_template.html.ejs", {
    encoding: "utf8",
  })
  .replace("/css/style.css", `/css/${latestStyleBasename}`);

function template({ attributes, markdown, html, head = "" }) {
  const output = ejs.render(templ, {
    head,
    title: "",
    image: null,
    ...attributes,
    main: html ? html : renderMarkdown(markdown),
  });
  return output;
}

async function renderRedirects() {
  const tmpl = fs.readFileSync("src/_redirect.html.ejs", {
    encoding: "utf8",
  });

  const redirects = JSON.parse(
    fs
      .readFileSync("redirects.json", {
        encoding: "utf8",
      })
      .replace(/\s+\/\/.*\n/g, "")
  );

  Object.entries(redirects).forEach(([pathFrom, urlTo]) => {
    if (!pathFrom.includes("gen.co")) {
      // console.log({ pathFrom, urlTo });
      const filePath = Path.join("build", pathFrom, "index.html");
      ("build");
      // console.log({ filePath });
      // const url = urlTo.includes("http") ? urlTo : `https://${urlTo}`;
      const url = urlTo;
      const output = ejs.render(tmpl, { url });
      write(filePath, output);
    }
  });
}

function renderHead({ title, excerpt, image, url, type = "website" }) {
  return `
    <!-- Primary Meta Tags -->
    <title>${title}</title>
    <meta name="title" content="${title}">
    <meta name="description" content="${excerpt}">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="${type}">
    <meta property="og:url" content="${url}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${excerpt}">
    <meta property="og:image" content="${image}">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${url}">
    <meta property="twitter:title" content="${title}">
    <meta property="twitter:description" content="${excerpt}">
    <meta property="twitter:image" content="${image}">
  `;
}

async function render() {
  const postsByTitle = {};

  const postPaths = await glob("_*/*.md");
  await Promise.all(
    postPaths.map(path => {
      const { attributes, body } = read(path);
      const dest = path
        .replace("_posts/", "build/")
        .replace("_", "build/")
        .replace(/\d{4}-\d{2}-\d{2}-/, "")
        .replace(".md", "/index.html");
      const head = renderHead({
        ...attributes,
        url: dest
          .replace("/index.html", "")
          .replace("build/", "https://christian.gen.co/"),
      });
      const output = template({ attributes, markdown: body, head });
      write(dest, output);
      const webpath = dest.replace("/index.html", "").replace(/^build/, "");
      postsByTitle[webpath] = { ...attributes, filepath: path };
      // return Promise.resolve()
    })
  );

  const posts = Object.entries(postsByTitle)
    .map(([path, post]) => ({ ...post, webpath: path }))
    .sort((a, b) => (a.filepath < b.filepath ? 1 : -1));

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
        // console.log({ dest });
      }
    })
  );

  await refreshChrome();
  return posts;
}

async function main() {
  await render();
  await renderRedirects();

  if (process.argv[2] === "--watch") {
    console.log("watching...");
    watch("src", { recursive: true }, (evt, name) => {
      console.log("%s changed.", name);
      render();
      renderRedirects();
    });
  }
}
main();
