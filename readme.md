# nite-flights ([♫](https://www.youtube.com/watch?v=T9uIHjbt8zw))

Nite Flights is an isomorphic static site generator powered by Node and React. Its goal is to make it easy to make a "digital scrapbook" out of various media you have, from photos to Tweets. It's pretty far from this overall goal, but malleable enough that you can still build a pretty cool site with it.

Instead of traditional template-based static site generators like Jekyll, nite-flights sites are built with React components, which allow you to easily build full-featured sites, instead of being limited to various plugins and template filters. These components are rendered by the Nite Flights build tool, creating static pages, as well as a bundle of client-side JS that will take over after the initial page render. This allows you to build powerful single-page user-experiences while retaining the advantages of server-rendered applications (such as fast load times and SEO).

For an example site built with this tool, see [the source for loudplaces.disco.zone](https://github.com/thomasboyt/loudplaces.disco.zone).

## Installation

```
npm install -g nite-flights
```
