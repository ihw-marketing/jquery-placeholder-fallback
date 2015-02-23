# [jQuery placeholder fallback][jquery-placeholder-fallback]

[![Build Status](https://travis-ci.org/ihw-marketing/jquery-placeholder-fallback.svg)](https://travis-ci.org/ihw-marketing/jquery-placeholder-fallback)
[![devDependency Status](https://david-dm.org/ihw-marketing/jquery-placeholder-fallback/dev-status.svg)](https://david-dm.org/ihw-marketing/jquery-placeholder-fallback#info=devDependencies)

This jQuery plugin provides a fallback for browsers that doesn't [support][browser-support] the HTML5 placeholder attribute. The script supports `input` and `textarea` elements.

## Usage
Just include [jQuery][jquery] and the [jquery-placeholder-fallback](dist/jquery-placeholder-fallback.min.js) in your HTML file right before closing the `body` tag and let the magic happen.

```html
<body>
    ...
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script src="jquery-placeholder-fallback.min.js"></script>
</body>
```

Check out the [DEMO][demo].

## Credits
* [Jon Raasch][credits-jon-raasch]
* [Nico Hagenbeger][credits-nico-hagenberger]

## License
The **jquery-placeholder-fallback** script is licensed under the [MIT License](LICENSE).

[jquery-placeholder-fallback]: https://github.com/ihw-marketing/jquery-placeholder-fallback
[browser-support]: http://caniuse.com/#feat=input-placeholder
[jquery]: https://jquery.com/
[demo]: http://ihw-marketing.github.io/jquery-placeholder-fallback
[credits-jon-raasch]: https://gist.github.com/jonraasch/2892148
[credits-nico-hagenberger]: http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
