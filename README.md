# Adam Kiryk Website

## Get started

```sh
git clone https://github.com/akiryk/adamkiryk.git
cd path/to/adamkiryk
npm install

# run gulp to start the dev server
gulp
```

## CSS

Use BEM except in a few special cases:

- Accessibility oriented classes, such as classes related to visibility
- Special classes for handling webfonts (see below)
- Helper classes can be used as necessary and on a case-by-case basis — e.g. spacing such as mb-2. Use with discretion.

## JavaScript Libraries and Sources

- Scroll animation:
  - [ScrollMagic](https://github.com/janpaepke/ScrollMagic)
  - [ScrollMagic Plugins](https://github.com/janpaepke/ScrollMagic/tree/master/scrollmagic/minified/plugins)
- Tween animation:
  - [GSAP](https://github.com/greensock/GreenSock-JS)
  - [GSAP Plugins](https://github.com/greensock/GreenSock-JS/tree/master/src/minified/plugins)
- Loading webfonts: [Google Web Font Loader](https://developers.google.com/fonts/docs/webfont_loader)
- Loading JS files: [LoadJS](https://github.com/filamentgroup/loadJS/)

## Webfonts

Style fonts on the main BEM class, using fallback fonts instead of webfonts. Style webfonts by using one of the following special classes:

- `.ge-sans` for Google sans-serif (in this case, Open Sans)
- `.ge-sans--bold` for Google sans-serif bold
- `.tk-serif` for Typekit serif (Caslon)
- etc. etc.

This makes it easy for me to style fonts according to whether a webfont has loaded. For example:

```html
// index.html
<html class="wf-opensans-n4-active wf-adobecaslonpro-n4-active">
  <h3 class="heading tk-serif">My Heading</h3>
  <h3 class="subheading ge-sans">Subheading!</h3>

  // styles.css .heading { font-family: serif; } .subheading { font-family:
  sans-serif; } .wf-opensans-n4-active .ge-sans { font-family: 'Open Sans'; }
  .wf-adobecaslonpro-n4-active .tk-serif { font-family: 'Adobe Caslon'; }
</html>
```

## Images

Whenever possible, use srcset. For project pages, the main body column's width is 807px; the "full-width" image is 1366px; when images are placed side by side, they are 667px.

```
<img srcset="path/to/file.jpg 1366w,
             path/to/file.jpg 807w,
             path/to/file.jpg 667w"
             sizes="(min-width: 50em) 33.3vw, 100vw"
             src="path/to/file.jpg"
             alt="Testing srcset alt copy..." >
```

There are a few optional ways to present an image on project pages. See example markup below for guidance.

- Largest: Put the image in a div with `class="node-full"`
- Medium: Occupy the full width of the body copy, that is, the middle 6 columns.
- Two images side by side: Use the `node-gallery` class and give each image class of `node-gallery__2up`
- Add a drop shadow so that a white background doesn't blend into the website background: Add class of `visible-edges`

```html
<!-- Largest image -->
<div class="node-full">
  <figure>
    <img src="path/to/image.jpg" alt="" />
    <figcaption>Something here...</figcaption>
  </figure>
</div>

<!-- Medium image -->
<div class="node-body">
  <figure>
    <img src="path/to/image.jpg" alt="" />
    <figcaption>Something here...</figcaption>
  </figure>
</div>

<!-- Two images side by side, large -->
<div class="node-full">
  <div class="node-gallery">
    <figure class="node-gallery__2up">
      <img src="path/to/image-1.jpg" />
      <figcaption>Something here...</figcaption>
    </figure>
    <figure class="node-gallery__2up">
      <img src="path/to/image-2.jpg" />
      <figcaption>Something here...</figcaption>
    </figure>
  </div>
</div>

<!-- Two images side by side, small -->
<div class="node-body">
  <div class="node-gallery--body">
    <figure class="node-gallery--body__2up">
      <img src="path/to/image-1.jpg" />
      <figcaption>Something here...</figcaption>
    </figure>
    <figure class="node-gallery--body__2up">
      <img src="path/to/image-2.jpg" />
      <figcaption>Something here...</figcaption>
    </figure>
  </div>
</div>
```

## Videos

To lazy load videos, first, include `<script src="js/lazyload.js">` at bottom of the file. Then, change any video `src` attribute to `data-src`. That's it. Actually, be sure to remove the `autoplay` attribute from the video element and _add_ the `muted` attribute.

## Github pages

See [test pages here](https://akiryk.github.io/adamkiryk/)
