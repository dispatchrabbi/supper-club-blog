# Supper Club Blog
https://supperclub.report

## tl;dr

```sh
$ git clone git@github.com:dispatchrabbi/supper-club-blog.git
$ cd supper-club-blog
$ npm install
$ cp ./env.example ./env
# Add Google Maps and Trello info to .env

$ npm run build # build the site
$ npm run dev # develop on the site
$ npm run update:restaurants # update the restaurant list
$ npm run post # create a new post
```

## Getting started

This is a static site built using Node. (And all the build steps are homegrown!) That means we're doing pretty standard Node-y stuff to get up and running.

```sh
$ git clone git@github.com:dispatchrabbi/supper-club-blog.git
$ cd supper-club-blog
$ npm install
```

### API Keys
There are three environment variables you'll need to set in order to run the build, and they go in _.env_.

First, copy _.env.example_ to _.env_. _.env_ has secret information in it, so it should never be committed.

Next, visit [the Google Maps Embed API key-getting page](https://developers.google.com/maps/documentation/embed/get-api-key) and click **Get A Key**. As that page suggests, you'll probably want to lock this key down by restricting it to HTTP referrers matching `localhost/*`. Enter that API key in _.env_ for `MAPS_API_KEY`.

Then, visit <https://trello.com/app-key> to find your Trello API Key. Add that key to _.env_ for `TRELLO_API_KEY`. Then substitute your key into `https://trello.com/1/authorize?expiration=never&scope=read&response_type=token&name=Server%20Token&key=YOUR KEY HERE` and go to that page in a browser. Authorize the granting of the server token. Once the authorization is approved, the page will show you a token. Enter that token in _.env_ for `TRELLO_TOKEN`.

Lastly, you'll need the short URL for the Trello board itself. Go to the board you're using for the restaurant list and grab the alphanumeric code in the URL after `/b/` and before the next `/`. Put that in _.env_ for `TRELLO_RESTAURANT_BOARD`.

And now you should be good to go!

## Building the site

Just run:

```sh
$ npm run build
```

This will update the list of restaurants from Trello, and then run a whole bunch of transformations on the files in _src/_ , depositing the built files in _dist/_. The build process is encapsulated in _build.js_, and with tasks in _lib/build/_ playing support.

If you just want to do the site-building bit:

```sh
$ npm run build:site
```

You can build the site with drafts by setting the `INCLUDE_DRAFTS` environment variable to `'true'`. There are a few convenience scripts that do this for you:

```sh
$ npm run build:drafts
$ npm run dev:drafts
```

### Updating the restaurant list

To update the list of restaurants from the Trello, run:
```sh
$ npm run update:restaurants
```

This will update the list of restaurants if there have been any changes to the Trello board since the last update. If you want to force an update:

```sh
$ FORCE=true npm run update:restaurants
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
| restaurant | Yes | Which restaurant the post is about. This needs to be exactly the same as the title of the Trello card for everything to work. If no restaurant match is found, it will show a warning during the build. | `restaurant: Sarkis` |
| date | Yes | The date of the visit (in `YYYY-MM-DD` format) | `date: 2017-05-15` |
| cover | No | A link to the cover photo to use for the post | `cover: https://i.imgur.com/path/to/an/image.png` |
| teaser | No | The text to use when summarizing the post (on the front page, for example) | `teaser: Ever wanted to know what a real greasy spoon is like? Sarkis is the place to go.` |
| draft | No | Whether the post is a draft (and therefore shouldn't be published) | `draft: true` |
| layout | Yes | Which layout to use. For blog posts, always `post.html`. | `layout: post.html` |
