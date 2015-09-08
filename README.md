# Peridot

Peridot is an isomorphic static site generator powered by Node and React. Its goal is to make it easy to make a "digital scrapbook" out of various media you have, from photos to Tweets. It's pretty far from this overall goal, but malleable enough that you can still build a pretty cool site with it.

Instead of traditional template-based static site generators like Jekyll, Peridot sites are built with React components, which allow you to easily build full-featured sites, instead of being limited to various plugins and template filters. These components are rendered by the Peridot build tool, creating static pages, as well as a bundle of client-side JS that will take over after the initial page render. This allows you to build powerful single-page user-experiences while retaining the advantages of server-rendered applications (such as fast load times and SEO).

## Example

This generator powers [loudplaces.disco.zone](http://loudplaces.disco.zone). That site's source is [available on my GitHub](https://github.com/thomasboyt/loudplaces.disco.zone).

## Installation

```
npm install -g peridot
```

## CLI Usage

### `peridot new <path>`

Generate a new blog at `<path>`.

### `peridot build [--optimize]`

Build your blog to `_site/`. Optionally minify your client-side app bundle by passing `--optimize`.

### `peridot serve`

Serve your site at `localhost:3000`. This will automatically rebuild your client-side bundle and rendered pages when you change files in your project.

## Developing Your Site

*(this whole section is obviously a to-do at the moment. The [source for loudplaces.disco.zone](https://github.com/thomasboyt/loudplaces.disco.zone) may be a useful resource if you want to experiment with Peridot

### _entries.yml

### Customizing Components

### Custom Assets With Webpack

## Using Media

While you can use any form of media you want in your client-side application, Peridot has special tools for caching and hosting certain media. For example, Tweets can be cached and saved as part of your blog's data, which allows you to render them how you want on the client and server without any dependency on Twitter's JavaScript APIs.

### Photos

### Tweets