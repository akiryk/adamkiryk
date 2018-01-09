# Adam Kiryk Website

## CSS Conventions
Use BEM except in a few special cases:

* Accessibility oriented classes, such as classes related to visibility
* Special classes for handling webfonts (see below)
* Helper classes can be used as necessary and on a case-by-case basis — e.g. spacing such as mb-2. Use with discretion.

## Webfont Conventions
Style fonts on the main BEM class, using fallback fonts instead of webfonts. Style webfonts by using one of the following special classes:

* `.ge-sans` for Google sans-serif (in this case, Open Sans)
* `.ge-sans--bold` for Google sans-serif bold
* `.tk-serif` for Typekit serif (Caslon)
* etc. etc.

This makes it easy for me to style fonts according to whether a webfont has loaded. For example:

``` html
// index.html
<html class="wf-opensans-n4-active wf-adobecaslonpro-n4-active">
<h3 class="heading tk-serif">My Heading</h3>
<h3 class="subheading ge-sans">Subheading!</h3>

// styles.css
.heading {
  font-family: serif;
}

.subheading {
  font-family: sans-serif;
}

.wf-opensans-n4-active .ge-sans {
  font-family: 'Open Sans';
}

.wf-adobecaslonpro-n4-active .tk-serif {
  font-family: 'Adobe Caslon';
}
```