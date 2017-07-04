const posts = require('./_data/posts.json');
const fs = require('fs');
const slug = require('slug');
const rimraf = require('rimraf');
const toMarkdown = require('to-markdown');

const padZero = (n) =>
  n < 10 ? `0${n}` : n.toString();

const getPostContent = (post, n) =>
`---
title: "${post.title}"
index: "${post.index}"
audio: "${post.audio}"
order: ${n}
---

${toMarkdown(post.body)}
`;

function writePost(post, n) {
  const date = new Date(post.date);
  const y = date.getFullYear();
  const m = padZero(date.getMonth() + 1);
  const d = padZero(date.getDate());
  const filename = `${y}-${m}-${d}-${slug(post.title, { lower: true })}`;

  fs.writeFile(
    __dirname + '/_posts/' + filename + '.md',
    getPostContent(post, n),
    (err) => { if (err) console.error(err); }
  );
}

rimraf(__dirname + '/_posts/*', () => {
  posts.forEach(writePost);
});
