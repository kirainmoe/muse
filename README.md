<h1 align="center">
	<img src="favicon.png" alt="MUSE" />
</h1>

[![Build Status](https://travis-ci.org/moefront/muse.svg?branch=master)](https://travis-ci.org/moefront/muse)
[![Coverage Status](https://coveralls.io/repos/github/moefront/muse/badge.svg?branch=master)](https://coveralls.io/github/moefront/muse?branch=master)
[![npm](https://img.shields.io/npm/v/muse-player.svg?style=flat)]()
![npm download](https://img.shields.io/npm/dm/muse-player.svg)
[![devDependencies](https://img.shields.io/david/dev/moefront/muse.svg?style=flat)]()
[![license](https://img.shields.io/github/license/moefront/muse.svg?style=flat)]()
![built by](https://img.shields.io/badge/built_by-MoeFront-ff69b4.svg)


MUSE is a simple and diligent HTML5 audio player made with ❤ :)

[中文文档](https://github.com/moefront/muse/wiki/MUSE-5:-Getting-Start) / [Redux build](https://github.com/moefront/muse/tree/v5-redux) / [Old version](https://github.com/moefront/muse/tree/v4-legacy)

## Demo

Have a look at [here](https://moefront.github.io/muse/dist).

## Tech Stack

 - react
 - react-dom
 - mobx
 - mobx-react
 - stylus

## Installation

### Install via Package Manager

MUSE is available in [npmjs](https://www.npmjs.com/package/muse-player). You can install it by both **npm** and **yarn**.

```shell
$ yarn add muse-player  # using yarn
$ npm install --save-dev muse-player # using npm
```

### Install via Git

```shell
$ git clone https://github.com/moefront/muse
$ cd muse
$ yarn install  # or: npm install
```

### Download ZIP Directly

Click ```Clone or download``` then choose ```Download ZIP```, or redirect to release page to download a release version.

## Features

 - Build with React.js and Mobx
 - Both Mobx version(main) & Redux version(before 5.2.7)
 - Full lyric support
 - Lyric offset fixing
 - Right-click menu is finally supported
 - Fullscreen mode
 - Middlewares and Custom layouts (new)
 - Responsive design
 - Better mobile side experience
 - ...

## Usage

### Easily render player for single page
---
Firstly, import **./dist/assets/muse-player.js** to your own page (Stylesheet has been injected in this Javascript file):
```html
<script type="text/javascript" src="./dist/assets/muse-player.js"></script>
```

Secondly, use ```MUSE.render()``` method to render player to your page.

> PS: If you are migrating from YMPlayer 4 to MUSE, pay attention that the method of using custom tag to render player has been removed. But you can still use ```MUSE.render()``` or ```YMPlayer.render()``` to render a player:

```javascript
/**
 * use MUSE.render() or YMPlayer.render() to 
 * render a MUSE Player component on your page.
 *
 * @param data {Array}  Musics' detail
 * @param node {Object} HTML element in which new player will be put.
 * @param opt  {Object} Player options
 *
 * @return {Object}
 */

MUSE.render([{
	title: '',
	artist: '',
	cover: '',
	src: '',
	lyric: '',
	translation: ''			// if you do not need translation, delete this row.
}, {
	// ......
}], document.getElementById('player'));
```

---

### Generating music JSON from Netease Cloud Music automatically

First have ```muse-json-generator``` installed. You can install it from npm. Also you should know the music's Netease Cloud Music ID that you want to add.

```shell
$ npm install -g muse-json-generator
$ muse 2333666 id1 id2 ...
```

Then you will find a ```playlist.json``` on your workspace, which contains the detials(title, artist, lyric, cover, src, translation) of your target.

For more detail, see https://github.com/moefront/muse-json-generator .

---

### Using MUSE in your own project

---

You must have muse-player already installed.

#### in React.js Project with webpack bundling

```javascript
import React from 'react';
import { render } from 'react-dom';

import { MuseDOM as MUSE } from 'muse-player';

const playList = [{
	// ...
}];

// MUSE.render() will returns a object with React Component and Player ID wrapped
// player { component: ReactComponent, ref: undefined, id }
const player = MUSE.render(playList); 

const node = document.getElementById('app');		// DOM

render(
	<player.component />,
	node
);

```

#### RequireJS or other AMD module loader

```javascript
require(['muse-player'], function(MuseDOM) {
	MuseDOM.render(...);
});
```

#### Others

```html
<script text="text/javascript" src="./dist/assets/muse-player.js"></script>
```

This will export MuseDOM instance to ```window```:
```javascript
window.MuseDOM.render();
```

## Commands

 - Run server in dev mode: ```yarn serve```
 - Run server in production mode: ```yarn serve:dist```
 - Build a dist: ```yarn dist```

## Related Projects

Projects related to MUSE below can help you construct MUSE Player on your site easily. Thanks for their hard working!

 - **muse-json-generator** by [@kokororin](https;//github.com/kokororin): https://github.com/moefront/muse-json-generator
 - **typecho-plugin-ymplayer** by [@kokororin](https;//github.com/kokororin): https://github.com/kokororin/typecho-plugin-ymplayer
 - **muse-plugin-desktop-lyric**: https://github.com/kirainmoe/muse-plugin-desktop-lyric

## Troubleshooting

You can find solutions of most problems on [Wiki](https://github.com/moefront/muse). If not, please open an issue whenever you are facing a problem, or contact us at kirainmoe@gmail.com.

## Contributing

Both contributing code to this project and telling us your suggestion and ideas are welcomed.

Thanks those who contributed to MUSE Player: [@kokororin](https://github.com/kokororin), [@frank-deng](https://github.com/frank-deng).

## Developing Docs

You can find a detailed documentation about APIs, methods, specification, etc. on WiKi.

## Browser supports

![IE](https://github.com/alrra/browser-logos/raw/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) | ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/chrome_12-48/chrome_12-48_48x48.png) | ![Firefox](https://github.com/alrra/browser-logos/raw/master/src/archive/firefox_3.5-22/firefox_3.5-22_48x48.png) | ![Opera](https://github.com/alrra/browser-logos/raw/master/src/archive/opera_15-32/opera_15-32_48x48.png) | ![Safari](https://github.com/alrra/browser-logos/raw/master/src/archive/safari_1-7/safari_1-7_48x48.png)
--- | --- | --- | --- | --- |
IE 10+ ✔ | Chrome 24.0+ ✔ | Firefox 24.0+ ✔ | Opera 15.0+ ✔ | Safari 7.0+ ✔ |

## Todo list

 - [x] Custom layouts full support
 - [ ] Documents for developing (plugins, themes...)

## License

&copy; 2017 MoeFront Studio | The MIT License (MIT).

