# Supper Club Blog
https://supperclub.report

## Getting started

This is a static site built using [Metalsmith](https://github.com/segmentio/metalsmith), which runs in Node. That means
we're doing pretty standard Node-y stuff to get up and running.

```sh
$ git clone git@github.com:dispatchrabbi/supper-club-blog.git
$ cd supper-club-blog
$ npm install
```

And you should be good to go!

## Building the site

Just run:

```sh
$ npm run build
```

This will run Metalsmith on the files in _src/_ using the configuration info in _metalsmith-config.js_, depositing the
built files in _dist/_.

### Cleaning built files out

If you need to clean out built files without building afterward:

```sh
$ npm run clean
```

## Developing

The best way to work on the site itself is:

```sh
$ npm run dev
```

This will watch the _src/_ and _layouts/_ directories (`npm run watch`) and run a build when anything changes. It will
also simultaneously set up a web server (`npm run serve`) at <http://localhost:8888> that serves out of _dist/_ so you
can see your changes.

## Writing blog posts

...We'll figure out the specifics later, but it's going to involve putting a Markdown file in _src/posts/_ and putting
the right metadata in the front-matter. You'll want the file to look something like this:

```markdown
---
title: Sarkis
date: 2017-06-04
draft: true
---
This restaurant was *awesome*. Let me tell you just how awesome it was.
```
(_src/posts/sarkis.md_)

To publish the post, remove `draft: true` from the front-matter.
