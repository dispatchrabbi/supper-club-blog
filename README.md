# Supper Club Blog
https://supperclub.report

## Getting started

This is a static site built using Node. (And all the build steps are homegrown!) That means we're doing pretty standard Node-y stuff to get up and running.

```sh
$ git clone git@github.com:dispatchrabbi/supper-club-blog.git
$ cd supper-club-blog
$ npm install
```

You'll also need to copy _.env.example_ to _.env_ (which should never be committed), and put a Google Maps API key in that file.

And you should be good to go!

## Building the site

Just run:

```sh
$ npm run build
```

This will run a whole bunch of transformations on the files in _src/_ , depositing the built files in _dist/_. The build process is encapsulated in _build.js_, and with tasks in _lib/build/_ playing support.

You can build the site with drafts by setting the `INCLUDE_DRAFTS` environment variable to `'true'`. There are a few convenience scripts that do this for you:

```sh
$ npm run build:drafts
$ npm run dev:drafts
```

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

This will watch the _src/_ and _layouts/_ directories (`npm run watch`) and run a build when anything changes. It will also simultaneously set up a web server (`npm run serve`) at <http://localhost:8888> that serves out of _dist/_ so you can see your changes.

## Writing blog posts

### The easy way

There's an npm script for this, because of course there is. Just run:

```sh
$ npm run post
```

### By hand

What you're gonna want to do is put a Markdown file in _src/posts/_ and put the right metadata in the front-matter. You'll want the file to look something like this:

```markdown
---
title: Loretta Believe It!
restaurant: Sarkis
date: 2017-06-04
layout: post.html
draft: true
---
This restaurant was *awesome*. Let me tell you just how awesome it was.
```
(_src/posts/sarkis.md_)

Here are the available options for the front-matter:

| Key | Required? | Description | Example |
|-----|-----------|-------------|---------|
| title | Yes | The title of the blog post | `title: Loretta Believe It!` |
| restaurant | Yes | Which restaurant the post is about | `restaurant: Sarkis` |
| date | Yes | The date of the visit (in `YYYY-MM-DD` format) | `date: 2017-05-15` |
| cover | No | A link to the cover photo to use for the post | `cover: https://i.imgur.com/path/to/an/image.png` |
| teaser | No | The text to use when summarizing the post (on the front page, for example) | `teaser: Ever wanted to know what a real greasy spoon is like? Sarkis is the place to go.` |
| draft | No | Whether the post is a draft (and therefore shouldn't be published) | `draft: true` |
| layout | Yes | Which layout to use. For blog posts, always `post.html`. | `layout: post.html` |
