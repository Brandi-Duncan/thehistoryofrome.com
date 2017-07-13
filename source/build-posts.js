const posts = require('./posts.json');
const fs = require('fs');
const slug = require('slug');
const rimraf = require('rimraf');
const toMarkdown = require('to-markdown');

const padZero = (n) =>
  n < 10 ? `0${n}` : n.toString();

const getPostContent = post =>
`---
title: "${post.title}"
index: "${post.index}"
audio: "${post.audio}"
order: ${post.order}
slug: "${post.index}"
---

${toMarkdown(post.body).replace(
  /\[.+\]\(.+traffic\.libsyn\.com.+\)/,
  ''
)}
`;

function writePost(post, n) {
  const date = new Date(post.date);
  const y = date.getFullYear();
  const m = padZero(date.getMonth() + 1);
  const d = padZero(date.getDate());
  const filename = `${y}-${m}-${d}-${post.index}-${slug(post.title, { lower: true })}`;

  fs.writeFile(
    __dirname + '/_posts/' + filename + '.md',
    getPostContent(post, n),
    (err) => { if (err) console.error(err); }
  );
}

rimraf(__dirname + '/_posts/*', () => {
  posts.forEach(writePost);
});
