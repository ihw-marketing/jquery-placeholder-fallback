# jQuery placeholder fallback

This jQuery script provides a fallback for [browsers that doesn't natively support][browser-support] the HTML5 placeholder attribute. The script supports `input` and `textarea` elements.

The **jquery-placeholder-fallback** script is licensed under the [MIT License][license]. The full license can be found [here](LICENSE.md).

## Usage

Just insert the script tags which link to [jQuery][jquery] and the [jquery-placeholder-fallback](jquery-placeholder-fallback.js) right before closing the `body` tag and let the magic happen.

```HTML
<body>
	...
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="jquery-placeholder-fallback.min.js"></script>
</body>
```

A working demo can be found [here][demo].

## Credits

* [Jon Raasch][credits-jon-raasch]
* [Nico Hagenbeger][credits-nico-hagenberger]

[browser-support]: http://caniuse.com/#feat=input-placeholder
[license]: http://en.wikipedia.org/wiki/MIT_License
[jquery]: http://jquery.com/
[demo]: http://ihw-marketing.github.io/jquery-placeholder-fallback/
[credits-jon-raasch]: https://gist.github.com/jonraasch/2892148
[credits-nico-hagenberger]: http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html