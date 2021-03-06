# postcss-background-image-auto-size

> A PostCSS plugin to add CSS rules `width` and `height` for `background-image` automatically.

## Get Started

### Installation

```sh
$ yarn add postcss-background-image-auto-size --dev
```

### Usage

```js
// postcss.config.js
const autoSize = require('postcss-background-image-auto-size');

module.exports = {
    plugins: [
        autoSize(),
    ],
};
```

### Example

```css
/* Before */
.logo {
    background-image: url('./images/logo.png');
}

/* After */
.logo {
    background-image: url('./images/logo.png');
    width: 400px;
    height: 400px;
}
```

## License

Licensed under the [MIT License](https://github.com/JustClear/postcss-background-image-auto-size/blob/master/LICENSE)