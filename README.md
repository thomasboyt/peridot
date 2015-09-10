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

*(this whole section is obviously a to-do at the moment. The [source for loudplaces.disco.zone](https://github.com/thomasboyt/loudplaces.disco.zone) may be a useful resource if you want to experiment with Peridot)*

### \_entries.yml

Entries have the following default fields. Fields marked with an asterisk (\*) are in the shortened version of an entry used for the post list views.

* \* `title`: The title of the entry
* \* `date`: The date of the entry. Should be a string in the format `YYYY-MM-DD`.
* \* `location`: The location of the entry.
* `body`: The body of the entry. This is parsed and rendered as Markdown.
* `media`: A list of media (see [Using Media](#using-media))

Only the `title` and `date` fields are required.

#### hasMedia & hasBody

Two additional fields, `hasMedia` and `hasBody`, are automatically added to the serialized `post` received by the `<List />` and `<Post />` components. If there is media or a post body present, the respective attribute will be `true`; otherwise it's set to `false`.

#### Custom fields

You an add additional custom fields, which will be passed as part of the `post` object received in the `<Post />` component. They will not be available as part of the "short-form" post objects passed to the `<List />` component (see [this issue](https://github.com/thomasboyt/peridot/issues/38)).

### Customizing Components

### Custom Assets With Webpack

## Using Media

While you can use any form of media you want in your client-side application, Peridot has special tools for caching and hosting certain media. For example, Tweets can be cached and saved as part of your blog's data, which allows you to render them how you want on the client and server without any dependency on Twitter's JavaScript APIs.

### Photos

Peridot can import photos from your local filesystem during its build process, resizing and caching them for future display. This requires you to have either [GraphicsMagick](http://www.graphicsmagick.org/) or [ImageMagick](http://www.imagemagick.org/script/index.php) installed. On OSX, you can install them with [Homebrew](http://brew.sh/).

For example, in `_entries.yml`, the following `media`:

```yaml
media:
  - photo: speedy/IMG_1119.jpg
    caption: Aye Nako in action
```

Will import a file from `project_directory/photos/speedy/IMG_1119.jpg`.

The photo will be resized to whatever sizes you have defined in your project's `_settings.yml` file. You can access the URL for each size on `media.data.sizes` in your app. For example, if you defined the following sizes in `_settings.yml`:

```yaml
photos:
  sizes:
    large:
      w: 1024
      h: 1024
    thumb:
      w: 250
      h: 250
```

You could then render the thumbnail, with a link to the large image, like so:

```js
const Post = React.createClass({

  // ...

  renderMedia() {
    const media = this.props.post.media;

    return media.map((media) => {
      if (media.type === 'photo') {
        return (
          <a href={media.data.sizes.large} key={media.data.sizes.large}>
            <img src={media.data.sizes.thumb} />
            <p>{media.data.caption}</p>
          </a>
        );
      }
    });
  },

  // ...
});
```

### Tweets
